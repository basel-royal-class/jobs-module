import { Injectable } from '@nestjs/common';
import { ReferenceRepository } from '../repositories/references.repository';
import { ReferenceEntity } from '../entities/references.entity';
import { CreateReferenceDto } from '../dtos/references.dto';

@Injectable()
export class ReferenceService {
  constructor(private referenceRepository: ReferenceRepository) {}

  async findAll(): Promise<ReferenceEntity[]> {
    return this.referenceRepository.findAll();
  }

  async findById(id: number): Promise<ReferenceEntity> {
    return this.referenceRepository.findById(id);
  }

  async create(createReferenceDto: CreateReferenceDto): Promise<ReferenceEntity> {
    return this.referenceRepository.createReference(createReferenceDto);
  }

  async delete(id: number): Promise<void> {
    await this.referenceRepository.deleteReference(id);
  }
}
