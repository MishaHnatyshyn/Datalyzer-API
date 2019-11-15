import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ModelsCountResponseObject {
  @ApiResponseModelProperty()
  count: number;
}
