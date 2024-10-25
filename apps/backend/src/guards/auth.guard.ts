import { Reflector } from '@nestjs/core';
import { AuthService } from '../modules/api/v1/auth/auth.service';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, UseGuards, SetMetadata } from '@nestjs/common';
import { ErrorMessage } from '../constants/error-message.constant';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
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
            const payload = this.authService.verifyToken(accessToken);
            request.user = payload;
            return this.hasRequiredRoles(request.user.roles, requiredRoles);;
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
                    return this.hasRequiredRoles(request.user.roles, requiredRoles);
                } catch (refreshError) {
                    throw new UnauthorizedException(ErrorMessage.INVALID_REFRESH_TOKEN);
                }
            }
            throw new UnauthorizedException(ErrorMessage.INVALID_ACCESS_TOKEN);
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