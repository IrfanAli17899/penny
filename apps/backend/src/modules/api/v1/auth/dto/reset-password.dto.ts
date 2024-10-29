import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { passwordValidation } from '@backend/common/dto/password.dto';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class ResetPasswordDto {
  @JoiSchema(passwordValidation)
  password: string;
}
