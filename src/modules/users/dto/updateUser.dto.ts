import {IsString, IsNumber, IsOptional} from 'class-validator';
import {ApiModelPropertyOptional} from '@nestjs/swagger';

export default class UpdateUserDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  user_type_id: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}
