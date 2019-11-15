import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ConnectionsCountResponseObject {
  @ApiResponseModelProperty()
  totalConnections: number;
}
