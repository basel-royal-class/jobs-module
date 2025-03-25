import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CountryEntity } from '../../../core/entities/countries.entity';

@Injectable()
export class CountriesRepository extends Repository<CountryEntity> {
  constructor(
    @InjectRepository(CountryEntity)
    private countryEntityRepository: Repository<CountryEntity>,
  ) {
    super(
      countryEntityRepository.target,
      countryEntityRepository.manager,
      countryEntityRepository.queryRunner,
    );
  }

  async findAllCountries(): Promise<CountryEntity[]> {
    try {
      return await this.countryEntityRepository.find();
    } catch (error) {
      throw new Error(`Error fetching all countries: ${error.message}`);
    }
  }

  async findCountryById(id: number): Promise<CountryEntity | null> {
    try {
      return await this.countryEntityRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Error fetching country with id ${id}: ${error.message}`);
    }
  }

  async findCountriesBySearchTerm(searchTerm: string): Promise<CountryEntity[]> {
    try {
      return await this.countryEntityRepository.find({
        where: {
          name: ILike(`%${searchTerm}%`),
        },
      });
    } catch (error) {
      throw new Error(`Error searching countries with term "${searchTerm}": ${error.message}`);
    }
  }
}
