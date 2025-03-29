import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../core/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../../../core/dtos/users.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    return this.userRepository.createUser(createUserDto);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    
    return user;
  }
}