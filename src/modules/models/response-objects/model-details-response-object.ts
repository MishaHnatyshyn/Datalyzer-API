import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ModelDetailsResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  users: number;

  @ApiResponseModelProperty()
  created: string;

  @ApiResponseModelProperty()
  tables: number;

  @ApiResponseModelProperty()
  fields: number;

  @ApiResponseModelProperty()
  uses: number;

  @ApiResponseModelProperty()
  active: boolean;
}
