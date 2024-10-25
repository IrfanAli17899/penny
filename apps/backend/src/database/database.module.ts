import { Global, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

@Global()
@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://irfanali17899:hj1ZNkEZj3pTC0RS@cluster0.t62ln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
        // ConfigModule,
        // MongooseModule.forRootAsync({
        //     // imports: [ConfigModule],
        //     useFactory: async (configService: ConfigService) => ({
        //         uri: configService.MONGOOSE_URI, 
        //     }),
        //     inject: [ConfigService],
        // })
    ],
})
export class DatabaseModule { }