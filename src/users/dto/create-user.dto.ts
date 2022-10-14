import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsString()
  address: string;

  refreshToken?: string;

  orders?: Order[];
}
