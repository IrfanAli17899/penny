import { Reflector } from '@nestjs/core';
import { AuthService } from '../modules/api/v1/auth/auth.service';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, UseGuards, SetMetadata } from '@nestjs/common';
import { ErrorMessage } from '../constants/error-message.constant';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies.accessToken;
        const refreshToken = request.cookies.refreshToken;

        if (!accessToken) {
            throw new UnauthorizedException(ErrorMessage.ACCESS_TOKEN_NOT_FOUND);
        }

        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()) || [];

        try {
            request.user = await this.authService.verifyToken(accessToken, this.configService.JWT_SECRET);
            return this.hasRequiredRoles(request.user.roles, requiredRoles);
        } catch (error) {
            if (error.name === 'TokenExpiredError' && refreshToken) {
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

                request.user = await this.authService.verifyToken(newTokens.accessToken, this.configService.JWT_SECRET);
                return this.hasRequiredRoles(request.user.roles, requiredRoles);
            } else if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException(ErrorMessage.INVALID_ACCESS_TOKEN);
            }
            throw error;
        }
    }
    private hasRequiredRoles(userRoles: string[], requiredRoles: string[]): boolean {
        if (requiredRoles.length === 0) return true; // No roles required, access granted
        const isAllowed = requiredRoles.some(role => userRoles.includes(role)); // Check if user has any of the required roles
        if (!isAllowed) throw new UnauthorizedException(ErrorMessage.NOT_ALLOWED);
    }
}

export const AuthedOnly = (options: { roles?: string[] } = {}) => {
    SetMetadata('roles', options.roles || []);
    return UseGuards(AuthGuard);
};