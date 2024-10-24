import { Global, Module } from "@nestjs/common";
import { ConfigModule as EnvModule } from '@nestjs/config';

@Global()
@Module({
    imports: [
        EnvModule.forRoot(), 
    ],
})
export class ConfigModule { }