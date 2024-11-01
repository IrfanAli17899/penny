import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { Token, TokenSchema } from './entities/token.entity';
import { MailService } from '@backend/libs/nodemailer.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Token.name, schema: TokenSchema }])],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, MailService],
})
export class AuthModule { }
