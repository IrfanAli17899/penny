import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],  // Ensure ConfigModule is imported
            useFactory: async (configService: ConfigService) => ({
                uri: configService.MONGOOSE_URI,  // Use env variable for MongoDB URI
            }),
            inject: [ConfigService],  // Inject ConfigService to access env variables
        })
    ],
})
export class DatabaseModule { }