import { IsNotEmpty, IsString, IsNumber, IsNumberString } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateConnectionDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  host: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumberString()
  port: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  databaseName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  typeId: number;
}
