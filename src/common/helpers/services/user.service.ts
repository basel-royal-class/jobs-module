import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../../core/dtos/user.dto';
import { UsersRepository } from '../repositories/user.repository';
import { Users } from 'src/core/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<Users> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    return this.usersRepository.create(createUserDto);
  }
}
