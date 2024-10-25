import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthedOnly } from '../../../../guards/auth.guard';
import { ReqUser } from '../../../../decorators/req-user.decorator';
import { UserDocument } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @AuthedOnly()
  me(@ReqUser() user: UserDocument) {
    return user;
  }

}
