import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdDto {
  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
