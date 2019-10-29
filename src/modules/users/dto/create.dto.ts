import {IsNotEmpty, MinLength, IsString, IsNumber, IsOptional} from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  user_type_id: number;

  @IsOptional()
  @IsString()
  description?: string;
}
