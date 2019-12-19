import {
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateReportDto {
  @ApiModelPropertyOptional({ minimum: 40 })
  @IsOptional()
  @IsNumber()
  @Min(40)
  readonly width?: number;

  @ApiModelPropertyOptional({ minimum: 40 })
  @IsOptional()
  @IsNumber()
  @Min(40)
  readonly height?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly position_x?: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly position_y?: number;

}
