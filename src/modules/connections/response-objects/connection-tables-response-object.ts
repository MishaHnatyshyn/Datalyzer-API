import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ConnectionTablesResponseObject {
  @ApiResponseModelProperty()
  tableName: string;

  @ApiResponseModelProperty()
  columns: string[];
}
