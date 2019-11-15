import { IsNotEmpty } from 'class-validator';
import { UserType } from './user.type.dto';
import {ApiModelProperty} from '@nestjs/swagger';

export class UserJwtDto {
  @ApiModelProperty()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  id: number;

  @ApiModelProperty()
  @IsNotEmpty()
  user_type: UserType;
}
