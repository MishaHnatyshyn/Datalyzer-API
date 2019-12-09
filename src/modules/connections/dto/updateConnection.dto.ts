import {IsString, IsNumberString, IsOptional} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UpdateConnectionDto {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  host: string;

  @ApiModelProperty()
  @IsOptional()
  @IsNumberString()
  port: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  databaseName: string;
}
