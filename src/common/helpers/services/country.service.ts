import { Injectable, NotFoundException } from '@nestjs/common';
import { CountryEntity } from '../../../core/entities/countries.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountriesRepository } from '../repositories/country.repository';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountriesRepository)
    private countriesRepository: CountriesRepository
  ) {}

  async findAll(): Promise<CountryEntity[]> {
    return this.countriesRepository.find();
  }

  async findOne(id: number): Promise<CountryEntity> {
    const country = await this.countriesRepository.findOne({ where: { id } });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }
}
