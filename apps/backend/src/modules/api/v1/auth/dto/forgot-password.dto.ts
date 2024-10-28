import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class ForgotPasswordDto {
  @JoiSchema(joi.string().email().required())
  email: string;
}