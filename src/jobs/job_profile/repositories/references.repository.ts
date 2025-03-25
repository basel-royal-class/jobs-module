import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ReferenceEntity } from '../entities/references.entity';
import { CreateReferenceDto } from '../dtos/references.dto';

@Injectable()
export class ReferenceRepository extends Repository<ReferenceEntity> {
  constructor(private dataSource: DataSource) {
    super(ReferenceEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<ReferenceEntity[]> {
    return this.find({
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: number): Promise<ReferenceEntity> {
    const reference = await this.findOneBy({ id });

    if (!reference) {
      throw new NotFoundException(`Reference with ID ${id} not found`);
    }

    return reference;
  }

  async createReference(createDto: CreateReferenceDto): Promise<ReferenceEntity> {
    const now = new Date();

    const reference = this.create({
      ...createDto,
      created_at: now,
      updated_at: now,
    });

    return this.save(reference);
  }

  async deleteReference(id: number): Promise<void> {
    const reference = await this.findById(id);
    await this.remove(reference);
  }
}
