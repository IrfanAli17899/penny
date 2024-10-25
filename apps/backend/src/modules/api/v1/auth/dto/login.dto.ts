import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class LoginDto {
  @JoiSchema(joi.string().email().required())
  email: string;

  @JoiSchema(joi.string().required())
  password: string;
}