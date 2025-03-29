import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../../../core/dtos/users.dto';
import { User } from '../../../core/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  async getUserByEmail(@Query('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }
}