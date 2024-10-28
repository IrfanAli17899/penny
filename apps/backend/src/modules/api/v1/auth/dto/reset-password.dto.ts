import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class ResetPasswordDto {
  @JoiSchema(joi.string().required())
  password: string;
}
