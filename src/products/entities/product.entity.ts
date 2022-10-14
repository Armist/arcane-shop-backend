import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'title', type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ name: 'img', type: 'varchar', nullable: false, length: 255 })
  img: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToMany(
    () => Category,
    { cascade: true, eager: true },
  )
  @JoinTable({
      name: 'products_categories',
      joinColumn: { name: 'product', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'category', referencedColumnName: 'id' },
    },
  )
  categories: Category[];

  @ManyToMany(
    () => Brand,
    { cascade: true, eager: true },
  )
  @JoinTable({
    name: 'products_brands',
    joinColumn: { name: 'product', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'brand', referencedColumnName: 'id' },
  })
  brands: Brand[];

  @OneToMany(() => Order, order => order.products, { cascade: true })
  @JoinColumn()
  order: Order;
}
