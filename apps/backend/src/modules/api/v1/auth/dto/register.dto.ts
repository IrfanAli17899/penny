import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as joi from 'joi';
import { passwordValidation } from '@backend/common/dto/password.dto';

@JoiSchemaOptions({
    allowUnknown: false,
})
export class RegisterDto {
    @JoiSchema(joi.string().required())
    username: string;

    @JoiSchema(joi.string().email().required())
    email: string;

    @JoiSchema(passwordValidation)
    password: string;

}