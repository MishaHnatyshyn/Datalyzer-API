import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ConnectionRelationsResponseObject {
  @ApiResponseModelProperty()
  foreignTable: string;

  @ApiResponseModelProperty()
  fkColumn: string;

  @ApiResponseModelProperty()
  primaryTable: string;

  @ApiResponseModelProperty()
  pkColumn: string;
}
