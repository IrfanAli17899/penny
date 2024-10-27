import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as joi from "joi";

@JoiSchemaOptions({
    allowUnknown: false,
})
export class DynamicSearchAndFilterDto {
    @JoiSchema(joi.string().allow('').optional())
    search?: string;

    @JoiSchema(joi.object({ page: joi.string().required(), limit: joi.string().required() }).optional().default({ page: 1, limit: 10 }))
    pagination?: { page: number, limit: number };

    @JoiSchema(joi.object().optional())
    filters?: Record<string, any>;
}


export type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@JoiSchemaOptions({
    allowUnknown: false,
})
export class PaginatedResponseDto<T> {
    @JoiSchema(joi.array().items(joi.object()).required())
    data: T[];

    @JoiSchema(joi.number().required())
    total: number;

    @JoiSchema(joi.number().required())
    page: number;

    @JoiSchema(joi.number().required())
    limit: number;

    @JoiSchema(joi.number().required())
    totalPages: number;


    // constructor(obj: PaginatedResponseDto<T>) {
    //     this.data = obj.data;
    //     this.total = obj.total;
    //     this.page = obj.page;
    //     this.limit = obj.limit;
    //     this.totalPages = obj.totalPages;
    // }
}
