import { Injectable } from '@nestjs/common';
import { DataSource, Repository, ILike } from 'typeorm';
import { CompaniesEntity } from '../../../core/entities/company.entity';

@Injectable()
export class CompaniesRepository extends Repository<CompaniesEntity> {
  constructor(private dataSource: DataSource) {
    super(CompaniesEntity, dataSource.createEntityManager());
  }

  async findAllCompanies(): Promise<CompaniesEntity[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new Error(`Error fetching all companies: ${error.message}`);
    }
  }

  async findCompaniesBySearchTerm(searchTerm: string): Promise<CompaniesEntity[]> {
    try {
      return await this.find({
        where: {
          name: ILike(`%${searchTerm}%`),
        },
      });
    } catch (error) {
      throw new Error(`Error searching companies with term "${searchTerm}": ${error.message}`);
    }
  }
  
  async findCompanyById(id: number): Promise<CompaniesEntity | null> {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Error fetching company with id ${id}: ${error.message}`);
    }
  }
}