import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
