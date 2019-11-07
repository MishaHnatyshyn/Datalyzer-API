import { IsNotEmpty, IsString, IsNumber, IsNumberString } from 'class-validator';

export class CreateConnectionDto {
  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsNumberString()
  port: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  databaseName: string;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;
}
