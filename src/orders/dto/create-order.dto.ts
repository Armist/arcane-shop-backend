import { IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  user: User

  @IsNotEmpty()
  products: Product[]
}
