import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessMessage } from './constants/success-message.constant copy';


@ApiTags('App')
@Controller()
export class AppController {

  @Get()
  getData() {
    return { message: SuccessMessage.WELCOME };
  }
}
