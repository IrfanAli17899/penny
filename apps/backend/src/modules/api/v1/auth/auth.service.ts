import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/entities/user.entity';
import { Token, TokenDocument } from './entities/token.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '../../../../config/config.service';
import { ErrorMessage } from '../../../../constants/error-message.constant';
import { MailService } from '../../../../libs/nodemailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) { }

  async register(obj: RegisterDto) {
    const hashedPassword = await bcrypt.hash(obj.password, 10);
    const user = new this.userModel({ ...obj, password: hashedPassword });
    await user.save();
    return this.generateAndStoreTokens(user);
  }

  async login(obj: LoginDto) {
    const user = await this.userModel.findOne({ email: obj.email });
    if (!user || !(await bcrypt.compare(obj.password, user.password))) {
      throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);
    }
    return this.generateAndStoreTokens(user);
  }

  private async generateAndStoreTokens(user: User) {
    const accessToken = this.createJwtToken(
      user,
      '1h',
      this.configService.ACCESS_TOKEN_EXPIRATION
    );
    const refreshToken = this.createJwtToken(
      user,
      '8h',
      this.configService.REFRESH_TOKEN_EXPIRATION
    );

    await this.tokenModel.create(
      { userId: user._id, token: refreshToken },
    );

    return { accessToken, refreshToken };
  }

  private createJwtToken(user: User, expiresIn = '1h', secret: string) {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      secret,
      { expiresIn }
    );
  }

  async refreshTokens(oldAccessToken: string, oldRefreshToken: string) {
    const userId = jwt.decode(oldAccessToken)['id'];
    const tokenEntry = await this.tokenModel.findOne({
      userId,
      token: oldRefreshToken,
    });

    if (!tokenEntry) {
      throw new NotFoundException(ErrorMessage.REFRESH_TOKEN_NOT_FOUND);
    }

    const user = await this.verifyToken(oldRefreshToken, this.configService.REFRESH_TOKEN_JWT_SECRET);

    return this.generateAndStoreTokens(user);
  }

  async invalidateRefreshToken(userId: string) {
    await this.tokenModel.findOneAndDelete({ userId });
  }

  async verifyToken(token: string, secret: string) {
    const payload = await jwt.verify(token, secret);
    if (!payload) {
      throw new NotFoundException(ErrorMessage.INVALID_ACCESS_TOKEN);
    }
    return await this.userModel.findById(payload.id, { password: 0 });
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }
    const token = this.createJwtToken(user, '10m', this.configService.FORGOT_PASSWORD_JWT_SECRET);
    await this.tokenModel.create({ token, userId: user._id });
    const resetPasswordUrl = `${this.configService.FRONTEND_BASE_URL}/auth/reset?token=${token}`;

    // Send the email with the reset password link
    await this.mailService.sendMail(
      email,
      'Password Reset Request',
      `You requested a password reset. Click the link to reset your password: ${resetPasswordUrl}`,
      `<p>You requested a password reset.</p><p><a href="${resetPasswordUrl}">Click here</a> to reset your password.</p>`
    );
  }

  async resetPassword(password: string, token: string) {
    if (!token) {
      throw new NotFoundException(ErrorMessage.TOKEN_NOT_FOUND);
    }
    const tokenData = await this.tokenModel.findOne({ token });
    if (!tokenData) {
      throw new NotFoundException(ErrorMessage.INVALID_TOKEN);
    }
    const verifiedUser = await this.verifyToken(token, this.configService.FORGOT_PASSWORD_JWT_SECRET);
    if (!verifiedUser) {
      throw new NotFoundException(ErrorMessage.INVALID_TOKEN);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await verifiedUser.updateOne({ password: hashedPassword });
    await tokenData.deleteOne();
  }
}
