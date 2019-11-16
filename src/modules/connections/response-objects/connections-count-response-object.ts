import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ConnectionsCountResponseObject {
  @ApiResponseModelProperty()
  count: number;
}
