import { IsNotEmpty } from 'class-validator';

export class UserType {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
