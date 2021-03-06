import { IsNotEmpty } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UserType {
  @ApiModelProperty()
  @IsNotEmpty()
  id: number;

  @ApiModelProperty()
  @IsNotEmpty()
  name: string;
}
