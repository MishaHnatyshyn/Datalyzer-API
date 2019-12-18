import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RenameModelDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
