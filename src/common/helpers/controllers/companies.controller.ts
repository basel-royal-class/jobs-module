import { Controller, Get, Param, Query } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAllCompanies() {
    try {
      const companies = await this.companiesService.findAllCompanies();
      return {
        success: true,
        data: companies,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('search')
  async findCompaniesBySearchTerm(@Query('term') searchTerm: string) {
    try {
      const companies = await this.companiesService.findCompaniesBySearchTerm(searchTerm);
      return {
        success: true,
        data: companies,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findCompanyById(@Param('id') id: number) {
    try {
      const company = await this.companiesService.findCompanyById(id);
      if (!company) {
        return {
          success: false,
          message: `Company with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: company,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
