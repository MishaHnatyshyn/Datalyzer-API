import { IsArray, IsNumber } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetModelFieldValuesDtoV2 {
  @ApiModelProperty()
  @Transform((value: string[]): number[] => value.map((i) => parseInt(i, 10)) )
  @IsArray()
  readonly modelItemFieldId: number[];
}
