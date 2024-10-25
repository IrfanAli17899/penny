import { AuthService } from '../modules/api/v1/auth/auth.service';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;

    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const payload = this.authService.verifyToken(accessToken);
      request.user = payload;
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError' && refreshToken) {
        try {
          const newTokens = await this.authService.refreshTokens(accessToken, refreshToken);

          request.res.cookie('accessToken', newTokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
          });

          request.res.cookie('refreshToken', newTokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 28800000, // 8 hours
          });

          request.user = this.authService.verifyToken(newTokens.accessToken);
          return true;
        } catch (refreshError) {
          throw new UnauthorizedException('Invalid refresh token or unable to refresh');
        }
      }
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
