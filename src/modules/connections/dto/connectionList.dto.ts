import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import {ApiModelProperty} from '@nestjs/swagger';

export class UserListDto {
  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  itemsPerPage: number;
}
