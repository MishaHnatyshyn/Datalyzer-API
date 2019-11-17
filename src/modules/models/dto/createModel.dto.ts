import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RelationItem } from './relationItem.dto';
import { ModelItem } from './modelItem.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiModelProperty()
  @IsNumber()
  readonly connectionId: number;

  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelPropertyOptional({ type: [RelationItem] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RelationItem)
  readonly relations: RelationItem[];

  @ApiModelProperty({ type: [ModelItem] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ModelItem)
  readonly items: ModelItem[];
}
