import {  DataSource, Repository } from 'typeorm';
import { User } from '../../../core/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }


  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      where: { email },
      relations: ['jobProfile'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.findOne({
      where: { id },
      relations: ['jobProfile'],
    });
  }
}