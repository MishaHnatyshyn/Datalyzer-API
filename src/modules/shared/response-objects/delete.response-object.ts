import {ApiResponseModelProperty} from '@nestjs/swagger';

export class DeleteResponseObject {
  @ApiResponseModelProperty()
  raw: [];

  @ApiResponseModelProperty()
  affected: number;
}
