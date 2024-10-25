import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as joi from 'joi';

@JoiSchemaOptions({
    allowUnknown: false,
})
export class RegisterDto {
    @JoiSchema(joi.string().required())
    username: string;
    
    @JoiSchema(joi.string().required())
    email: string;

    @JoiSchema(joi.string().required())
    password: string;

}