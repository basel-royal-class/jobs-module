import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CityEntity } from '../../../core/entities/cities.entity'

@Injectable()
export class CitiesRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async findAllCities(): Promise<CityEntity[]> {
    try {
      return await this.cityRepository.find();
    } catch (error) {
      throw new Error(`Error fetching all cities: ${error.message}`);
    }
  }

  async findCityById(id: number): Promise<CityEntity | null> {
    try {
      return await this.cityRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Error fetching city with id ${id}: ${error.message}`);
    }
  }

  async findCitiesByCountryId(countryId: number): Promise<CityEntity[]> {
    try {
      return await this.cityRepository.find({
        where: { countryId },
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new Error(`Error fetching cities for country id ${countryId}: ${error.message}`);
    }
  }
  
  async findCitiesBySearchTerm(searchTerm: string): Promise<CityEntity[]> {
    try {
      return await this.cityRepository.find({
        where: {
          name: ILike(`%${searchTerm}%`),
        },
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new Error(`Error searching cities with term "${searchTerm}": ${error.message}`);
    }
  }
}