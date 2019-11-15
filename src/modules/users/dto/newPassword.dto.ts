import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class NewPasswordDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  old_password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
