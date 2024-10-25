import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthedOnly } from '../../../../guards/auth.guard';
import { User } from '../../../../decorators/user.decorator';
import { UserDocument } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @AuthedOnly()
  me(@User() user: UserDocument) {
    return user;
  }

}
