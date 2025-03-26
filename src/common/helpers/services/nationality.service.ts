import { Injectable, NotFoundException } from '@nestjs/common';
import { NationalityRepository } from '../repositories/nationlity.repository';
import { CreateNationalityDto, NationalityResponseDto } from '../../../core/dtos/nationality.dto';
import { Nationality } from 'src/core/entities/nationality.entity';

@Injectable()
export class NationalityService {
  constructor(private readonly nationalityRepository: NationalityRepository) {}

  async createNationality(dto: CreateNationalityDto): Promise<NationalityResponseDto> {
    const nationality = await this.nationalityRepository.createNationality(dto.name);

    return {
      success: true,
      data: {
        id: nationality.id,
        name: nationality.name,
      },
    };
  }

  async findAll(): Promise<NationalityResponseDto> {
    const nationalities = await this.nationalityRepository.findAllNationalities();

    return {
      success: true,
      data: nationalities.map((nationality) => ({
        id: nationality.id,
        name: nationality.name,
      })),
    };
  }

  async findOne(id: number): Promise<NationalityResponseDto> {
    const nationality = await this.nationalityRepository.findNationalityById(id);

    return {
      success: true,
      data: {
        id: nationality.id,
        name: nationality.name,
      },
    };
  }

  async findNationalityBySearchTerm(searchTerm: string): Promise<Nationality[]> {
    return this.nationalityRepository.findNationalitysBySearchTerm(searchTerm);
  }
}
