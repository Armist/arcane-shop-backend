import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'title', type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ name: 'img', type: 'varchar', nullable: false, length: 255 })
  img: string;

  @ManyToMany(() => Product, (product: Product) => product.brands)
  products: Product[];
}
