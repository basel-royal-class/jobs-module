import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../repositories/companies.repository';
import { CompaniesEntity } from '../../../core/entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async findAllCompanies(): Promise<CompaniesEntity[]> {
    return this.companiesRepository.findAllCompanies();
  }

  async findCompaniesBySearchTerm(searchTerm: string): Promise<CompaniesEntity[]> {
    return this.companiesRepository.findCompaniesBySearchTerm(searchTerm);
  }

  async findCompanyById(id: number): Promise<CompaniesEntity | null> {
    return this.companiesRepository.findCompanyById(id);
  }
}