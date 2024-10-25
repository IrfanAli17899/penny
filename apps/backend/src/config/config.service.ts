import { Injectable } from "@nestjs/common";
import { ConfigService as EnvService } from '@nestjs/config';

@Injectable()
export class ConfigService {
    constructor(private envsService: EnvService) { }
    
    readonly NODE_ENV = this.envsService.get('NODE_ENV');

    readonly JWT_EXPIRATION = this.envsService.get('JWT_EXPIRATION');
    readonly JWT_SECRET = this.envsService.get('JWT_SECRET');

    readonly MONGOOSE_URI = this.envsService.get('MONGOOSE_URI');
}