import { Injectable } from '@nestjs/common';
import { IndustriesRepository } from '../repositories/industry.repository';
import { IndustriesEntity } from '../../../core/entities/industries.entity';

@Injectable()
export class IndustriesService {
  constructor(private readonly industriesRepository: IndustriesRepository) {}

  async findAllIndustries(): Promise<IndustriesEntity[]> {
    return this.industriesRepository.findAllIndustries();
  }

  async findIndustriesBySearchTerm(searchTerm: string): Promise<IndustriesEntity[]> {
    return this.industriesRepository.findIndustriesBySearchTerm(searchTerm);
  }
}