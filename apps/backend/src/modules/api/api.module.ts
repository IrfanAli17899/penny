import { Module } from '@nestjs/common';
import { AuthModule } from './v1/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './v1/user/user.module';
import { TodoModule } from './v1/todo/todo.module';

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
                            {
                                path: 'user',
                                module: UserModule,
                            },
                            {
                                path: 'todo',
                                module: TodoModule,
                            },
                        ],
                    },
                ],
            }]),
        UserModule,
        TodoModule,
    ]
})
export class ApiModule { }
