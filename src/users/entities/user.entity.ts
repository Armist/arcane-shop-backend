import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstname', type: 'varchar', nullable: false, length: 20 })
  firstName: string;

  @Column({ name: 'lastname', type: 'varchar', nullable: false, length: 20 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, length: 50 })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 255 })
  password: string;

  @Column({ name: 'isAdmin', type: 'boolean', nullable: false })
  isAdmin: boolean;

  @Column({ name: 'address', type: 'varchar', nullable: true, length: 255 })
  address: string;

  @OneToMany(() => Order, order => order.user)
  orders?: Order[];

  @Column({ name: 'refreshToken', type: 'varchar', nullable: true, length: 255 })
  refreshToken: string;
}
