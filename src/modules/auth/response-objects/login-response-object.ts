import {ApiResponseModelProperty} from '@nestjs/swagger';

export class LoginResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  username: string;

  @ApiResponseModelProperty()
  description: string;

  @ApiResponseModelProperty()
  user_type_id: number;

  @ApiResponseModelProperty()
  created_by_id: number;

  @ApiResponseModelProperty()
  created_at: string;

  @ApiResponseModelProperty()
  updated_at: string;

  @ApiResponseModelProperty()
  access_token: string;
}
