import { IsArray, IsNumber, IsString, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize, IsOptional } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsNumber()
  readonly dashboard: number;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  readonly newDashboardName?: string;

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
