import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/core/entities/users.entity';
import { CreateUserDto } from '../../../core/dtos/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<Users | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: [
        'experiences', 
        'experiences.industry', 
        'experiences.country', 
        'experiences.city', 
        'experiences.job_category', 
        'experiences.company'
      ],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }
}
