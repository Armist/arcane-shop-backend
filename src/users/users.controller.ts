import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (user) return user;
    else throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(id);
    if (user) {
      return await this.usersService.update(id, updateUserDto);
    } else throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (user) {
      return await this.usersService.remove(id);
    } else throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }
}
