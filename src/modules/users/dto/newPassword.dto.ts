import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class NewPasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  old_password: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
