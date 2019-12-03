import {ApiResponseModelProperty} from '@nestjs/swagger';

export default class ModelResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  admin_id: number;

  @ApiResponseModelProperty()
  db_connection_id: number;

  @ApiResponseModelProperty()
  created_at: string;

  @ApiResponseModelProperty()
  updated_at: string;
}
