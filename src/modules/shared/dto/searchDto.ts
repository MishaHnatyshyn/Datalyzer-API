import {IsNumber, IsString, IsOptional} from 'class-validator';
import { Type } from 'class-transformer';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';

export class SearchDto {
  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  itemsPerPage: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
