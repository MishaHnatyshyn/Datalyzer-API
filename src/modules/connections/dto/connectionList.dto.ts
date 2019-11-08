import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UserListDto {
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  itemsPerPage: number;
}
