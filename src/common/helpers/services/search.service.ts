// degree.service.ts
import { Injectable } from '@nestjs/common';
import { DegreesEntity } from '../../../core/entities/degrees.entity';
import { SchoolsEntity } from '../../../core/entities/schools.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CompaniesEntity } from 'src/core/entities/company.entity';
import { IndustriesEntity } from 'src/core/entities/industries.entity';
import { JobCategoryEntity } from 'src/core/entities/job-category.entity';
@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(DegreesEntity)
    private readonly degreesRepository: Repository<DegreesEntity>,

    @InjectRepository(SchoolsEntity)
    private readonly schoolsRepository: Repository<SchoolsEntity>,

  ) {}

  async degreesSearch(query: string): Promise<DegreesEntity[]> {
    return this.degreesRepository.find({
      where: {
        name: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:name)`, {
          name: `%${query}%`,
        }),
      },
    });
  }

  async schoolsSearch(query: string): Promise<SchoolsEntity[]> {
    return this.schoolsRepository.find({
      where: {
        name: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:name)`, {
          name: `%${query}%`,
        }),
      },
    });
  }

}
