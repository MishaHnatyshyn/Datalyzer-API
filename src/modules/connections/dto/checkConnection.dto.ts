import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import {ApiModelProperty} from '@nestjs/swagger';

export class CheckConnectionDto {
  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
