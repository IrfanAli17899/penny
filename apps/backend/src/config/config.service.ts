import { Injectable } from '@nestjs/common';
import { ConfigService as EnvService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private envsService: EnvService) {}

  readonly ACCESS_TOKEN_EXPIRATION =
    this.envsService.get('ACCESS_TOKEN_EXPIRATION') || '1h';
  readonly REFRESH_TOKEN_EXPIRATION =
    this.envsService.get('REFRESH_TOKEN_EXPIRATION') || '8h';

  readonly NODE_ENV = this.envsService.get('NODE_ENV');

  readonly JWT_SECRET = this.envsService.get('JWT_SECRET');
  readonly REFRESH_TOKEN_JWT_SECRET = this.envsService.get('REFRESH_TOKEN_JWT_SECRET');
  readonly FORGOT_PASSWORD_JWT_SECRET = this.envsService.get('FORGOT_PASSWORD_JWT_SECRET');

  readonly MONGOOSE_URI = this.envsService.get('MONGOOSE_URI');
  readonly FRONTEND_BASE_URL = this.envsService.get('FRONTEND_BASE_URL');

  readonly SMTP_HOST = this.envsService.get('SMTP_HOST');
  readonly SMTP_PORT = this.envsService.get('SMTP_PORT');
  readonly SMTP_USER = this.envsService.get('SMTP_USER');
  readonly SMTP_PASS = this.envsService.get('SMTP_PASS');
}
