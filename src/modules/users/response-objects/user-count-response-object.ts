import {ApiResponseModelProperty} from '@nestjs/swagger';

export class UserCountResponseObject {
  @ApiResponseModelProperty()
  count: number;
}
