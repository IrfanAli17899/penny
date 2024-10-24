import { Module } from '@nestjs/common';
import { JoiPipeModule } from 'nestjs-joi';

import { AppController } from './app.controller';
import { ApiModule } from './modules/api/api.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './api/v1/user/user.module';

@Module({
  imports: [
    ConfigModule,
    JoiPipeModule,
    ApiModule,
    WebhookModule,
    UserModule
  ],
  controllers: [AppController],
})
export class AppModule { }
