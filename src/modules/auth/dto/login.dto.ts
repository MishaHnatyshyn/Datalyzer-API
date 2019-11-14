import { IsNotEmpty } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}
