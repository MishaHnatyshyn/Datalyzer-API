import {IsNotEmpty, MinLength, IsString, IsNumber, IsOptional} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  user_type_id: number;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
