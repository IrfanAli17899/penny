import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ApiModule } from './modules/api/api.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [ApiModule, WebhookModule],
  controllers: [AppController],
})
export class AppModule { }
