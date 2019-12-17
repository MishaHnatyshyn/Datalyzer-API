import { IsArray, IsNumber, IsString, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsNumber()
  readonly dashboard: number;

  @ApiModelProperty()
  @IsNumber()
  readonly type: number;

  @ApiModelProperty({ isArray: true, uniqueItems: true, maxItems: 2, minItems: 2})
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  readonly modelItems: number[];
}
