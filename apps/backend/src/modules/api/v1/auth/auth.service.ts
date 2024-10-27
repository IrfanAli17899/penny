import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private readonly configService: ConfigService
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
    const accessToken = this.createJwtToken(user, this.configService.ACCESS_TOKEN_EXPIRATION);
    const refreshToken = this.createJwtToken(user, this.configService.REFRESH_TOKEN_EXPIRATION);

    await this.storeRefreshToken(user._id.toString(), refreshToken);

    return { accessToken, refreshToken };
  }

  private createJwtToken(user: User, expiresIn = '1h') {
    return jwt.sign({ id: user._id, username: user.username }, this.configService.JWT_SECRET, { expiresIn });
  }

  private async storeRefreshToken(userId: string, refreshToken: string) {
    await this.tokenModel.findOneAndUpdate(
      { userId },
      { refreshToken },
      { upsert: true, new: true }
    );
  }

  async refreshTokens(oldAccessToken: string, oldRefreshToken: string) {
    const userId = jwt.decode(oldAccessToken)['id'];
    const tokenEntry = await this.tokenModel.findOne({ userId, refreshToken: oldRefreshToken });

    if (!tokenEntry) {
      throw new NotFoundException(ErrorMessage.REFRESH_TOKEN_NOT_FOUND);
    }

    const user = await this.userModel.findById(userId);
    return this.generateAndStoreTokens(user);
  }

  async invalidateRefreshToken(userId: string) {
    await this.tokenModel.findOneAndDelete({ userId });
  }

  async verifyToken(token: string) {
      const payload = jwt.verify(token, this.configService.JWT_SECRET);
      return await this.userModel.findById(payload.id, { password: 0 });
  }
}
