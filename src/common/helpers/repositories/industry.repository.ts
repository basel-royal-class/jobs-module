import { Injectable } from '@nestjs/common';
import { DataSource, Repository, ILike } from 'typeorm';
import { IndustriesEntity } from '../../../core/entities/industries.entity';

@Injectable()
export class IndustriesRepository extends Repository<IndustriesEntity> {
  constructor(private dataSource: DataSource) {
    super(IndustriesEntity, dataSource.createEntityManager());
  }

  async findAllIndustries(): Promise<IndustriesEntity[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new Error(`Error fetching all industries: ${error.message}`);
    }
  }

  async findIndustriesBySearchTerm(searchTerm: string): Promise<IndustriesEntity[]> {
    try {
      return await this.find({
        where: {
          value: ILike(`%${searchTerm}%`),
        },
      });
    } catch (error) {
      throw new Error(`Error searching industries with term "${searchTerm}": ${error.message}`);
    }
  }
}