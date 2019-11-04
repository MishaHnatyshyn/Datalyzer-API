import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class NewPasswordDto {
  @IsNotEmpty()
  @Type(() => String)
  @MinLength(6)
  @IsString()
  old_password: string;

  @IsNotEmpty()
  @Type(() => String)
  @MinLength(6)
  @IsString()
  password: string;
}
