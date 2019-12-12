import { IsOptional, IsString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
