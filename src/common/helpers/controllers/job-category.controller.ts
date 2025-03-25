// src/job-categories/controllers/job-category.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobCategoryService } from '../services/job-category.service';

@Controller('job-categories')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Get('get_job_category')
  async findAllJobCategories() {
    try {
      const jobCategories = await this.jobCategoryService.findAllJobCategories();
      return {
        success: true,
        data: jobCategories,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('search')
  async findJobCategoriesBySearchTerm(@Query('term') searchTerm: string) {
    try {
      const jobCategories = await this.jobCategoryService.findJobCategoriesBySearchTerm(searchTerm);
      return {
        success: true,
        data: jobCategories,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findJobCategoryById(@Param('id') id: number) {
    try {
      const jobCategory = await this.jobCategoryService.findJobCategoryById(id);
      if (!jobCategory) {
        return {
          success: false,
          message: `Job category with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: jobCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}