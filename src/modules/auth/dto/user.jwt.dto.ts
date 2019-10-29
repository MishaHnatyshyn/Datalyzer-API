import { IsNotEmpty } from 'class-validator';
import { UserType } from './user.type.dto';

export class UserJwtDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  user_type: UserType;
}
