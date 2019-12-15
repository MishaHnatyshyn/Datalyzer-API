import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetModelFieldValuesDto {
  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  readonly connectionId: number;

  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  readonly modelItemFieldId: number;
}
