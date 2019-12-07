import {IsNumber, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class DeleteDto {
  @ApiModelProperty()
  @IsNumber()
  id: number;

  @ApiModelProperty()
  @IsString()
  deletionConfirmed: string;
}
