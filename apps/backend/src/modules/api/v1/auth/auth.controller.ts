import {
  Controller,
  Post,
  Body,
  Res,
  Delete,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '../../../../config/config.service';
import { AuthedOnly } from '../../../../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SuccessMessage } from '../../../../constants/success-message.constant copy';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.register(body);
    this.setTokensInResponse(accessToken, refreshToken, response);
    return { message: SuccessMessage.REGISTERED_SUCCESSFULLY };
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(body);
    this.setTokensInResponse(accessToken, refreshToken, response);
    return { message: SuccessMessage.LOGGED_IN_SUCCESSFULLY };
  }

  @Delete('logout')
  @AuthedOnly()
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const userId = request.user.id;
    await this.authService.invalidateRefreshToken(userId);
    this.clearTokensInResponse(response);
    return { message: SuccessMessage.LOGGED_OUT_SUCCESSFULLY };
  }

  setTokensInResponse(
    accessToken: string,
    refreshToken: string,
    response: Response
  ) {
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.NODE_ENV === 'production',
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.NODE_ENV === 'production',
    });
  }

  clearTokensInResponse(response: Response) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
  }

  @Post('forgot-password')
  async forgotPasswrd(@Body() body: ForgotPasswordDto) {
    await this.authService.forgotPassword(body.email);
    return { message: SuccessMessage.MESSAGE_SENT };
  }

  @Post('reset-password')
  async resetPasswrd(@Body() body: ResetPasswordDto, @Req() request: Request) {
    const token = ((request.headers['authorization'] as string) || '').split(
      ' '
    )?.[1];
    await this.authService.resetPassword(body.password, token);
    return { message: SuccessMessage.PASSWORD_CHANGED_SUCCESSFULLY };
  }
}
