import { Global, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.MONGOOSE_URI,
            }),
            inject: [ConfigService],
        })
    ],
})
export class DatabaseModule { }