import { IsArray, ArrayNotEmpty, ArrayMaxSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class DataForNewReportDto {
  @ApiModelProperty()
  @Transform((value: string[]): number[] => value.map((i) => parseInt(i, 10)) )
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  readonly modelItemFieldId: number[];
}
