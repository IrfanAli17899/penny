import { Controller, Post, Body, Res, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '../../../../config/config.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) { }

  @Post('register')
  async register(@Body() body: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.register(body);
    this.setTokensInResponse(accessToken, refreshToken, response);
    return { message: 'Registered successfully' };
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.login(body);
    this.setTokensInResponse(accessToken, refreshToken, response);
    return { message: 'Logged in successfully' };
  }

  @Delete('logout')
  async logout(@Req() request: Request) {
    const userId = request.user.id;
    await this.authService.invalidateRefreshToken(userId);
    return { message: 'User logged out successfully' };
  }

  setTokensInResponse(accessToken: string, refreshToken: string, response: Response) {
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.NODE_ENV === 'production',
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.NODE_ENV === 'production',
    });
  }
}
