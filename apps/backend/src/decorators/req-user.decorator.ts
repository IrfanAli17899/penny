import { UserDocument } from '../modules/api/v1/user/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // This will return the user set in the AuthGuard
  },
);

export type RequestUser = UserDocument;