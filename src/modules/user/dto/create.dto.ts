import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  user_type_id: number;
}
