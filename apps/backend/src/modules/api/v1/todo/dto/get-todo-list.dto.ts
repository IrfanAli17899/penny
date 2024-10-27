import { JoiSchema } from 'nestjs-joi';
import * as joi from 'joi';
import { DynamicSearchAndFilterDto } from '../../../../../common/dto/filters.dto';

export class GetTodoListDto extends DynamicSearchAndFilterDto {
  @JoiSchema(joi.object({ completed: joi.boolean().optional() }).optional().default({  }))
  filters?: {
    completed?: boolean;
  };
  
}