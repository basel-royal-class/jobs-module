import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Nationality } from '../../../core/entities/nationality.entity';

@Injectable()
export class NationalityRepository extends Repository<Nationality> {
  constructor(private dataSource: DataSource) {
    super(Nationality, dataSource.createEntityManager());
  }

  async createNationality(name: string): Promise<Nationality> {
    const nationality = this.create({ name });
    return await this.save(nationality);
  }

  async findNationalityById(id: number): Promise<Nationality> {
    const nationality = await this.findOne({
      where: { id },
    });

    if (!nationality) {
      throw new NotFoundException(`Nationality with ID ${id} not found`);
    }

    return nationality;
  }

  async findAllNationalities(): Promise<Nationality[]> {
    return await this.find();
  }

// 
}