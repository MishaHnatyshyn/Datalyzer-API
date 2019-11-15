import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ConnectionResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  username: string;

  @ApiResponseModelProperty()
  db_name: string;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  password: string;

  @ApiResponseModelProperty()
  host: string;

  @ApiResponseModelProperty()
  port: string;

  @ApiResponseModelProperty()
  admin_id: number;

  @ApiResponseModelProperty()
  type_id: number;

  @ApiResponseModelProperty()
  created_at: string;

  @ApiResponseModelProperty()
  updated_at: string;
}
