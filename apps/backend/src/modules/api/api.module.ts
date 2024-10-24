import { Module } from '@nestjs/common';
import { AuthModule } from './v1/auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
    imports: [
        AuthModule,
        RouterModule.register([
            {
                path: 'api',
                children: [
                    {
                        path: 'v1',
                        children: [
                            {
                                path: 'auth',
                                module: AuthModule,
                            },
                        ],
                    },
                ],
            }]),
    ]
})
export class ApiModule { }
