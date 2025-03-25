import { Controller, Get, Query } from '@nestjs/common';
import { IndustriesService } from '../services/industry.service';

@Controller('industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get('get_industries')
  async findAllIndustries() {
    try {
      const industries = await this.industriesService.findAllIndustries();
      return {
        success: true,
        data: industries,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('search')
  async findIndustriesBySearchTerm(@Query('term') searchTerm: string) {
    try {
      const industries = await this.industriesService.findIndustriesBySearchTerm(searchTerm);
      return {
        success: true,
        data: industries,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
