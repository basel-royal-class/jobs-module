// src/job-categories/services/job-category.service.ts
import { Injectable } from '@nestjs/common';
import { JobCategoryRepository } from '../repositories/job-category.repository';
import { JobCategoryEntity } from '../../../core/entities/job-category.entity';

@Injectable()
export class JobCategoryService {
  constructor(private readonly jobCategoryRepository: JobCategoryRepository) {}

  async findAllJobCategories(): Promise<JobCategoryEntity[]> {
    return this.jobCategoryRepository.findAllJobCategories();
  }

  async findJobCategoriesBySearchTerm(searchTerm: string): Promise<JobCategoryEntity[]> {
    return this.jobCategoryRepository.findJobCategoriesBySearchTerm(searchTerm);
  }

  async findJobCategoryById(id: number): Promise<JobCategoryEntity | null> {
    return this.jobCategoryRepository.findJobCategoryById(id);
  }
}