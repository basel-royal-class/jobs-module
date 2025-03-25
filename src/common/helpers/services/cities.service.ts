// src/cities/cities.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../../../core/entities/cities.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async findAll(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async findOne(id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async findByCountry(countryId: number): Promise<CityEntity[]> {
    return this.cityRepository.find({
      where: { countryId },
      order: { name: 'ASC' },
    });
  }
}