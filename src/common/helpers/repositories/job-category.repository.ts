// src/job-categories/repositories/job-category.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, ILike } from 'typeorm';
import { JobCategoryEntity } from '../../../core/entities/job-category.entity';

@Injectable()
export class JobCategoryRepository extends Repository<JobCategoryEntity> {
  constructor(private dataSource: DataSource) {
    super(JobCategoryEntity, dataSource.createEntityManager());
  }

  async findAllJobCategories(): Promise<JobCategoryEntity[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new Error(`Error fetching all job categories: ${error.message}`);
    }
  }

  async findJobCategoriesBySearchTerm(
    searchTerm: string,
  ): Promise<JobCategoryEntity[]> {
    try {
      return await this.find({
        where: {
          value: ILike(`%${searchTerm}%`),
        },
      });
    } catch (error) {
      throw new Error(`Error searching job categories with term "${searchTerm}": ${error.message}`);
    }
  }
  
  async findJobCategoryById(id: number): Promise<JobCategoryEntity | null> {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Error fetching job category with id ${id}: ${error.message}`);
    }
  }
}