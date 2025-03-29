import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VisaTypeEntity } from '../entities/visa.entity';

@Injectable()
export class VisaTypeRepository extends Repository<VisaTypeEntity> {
  constructor(private dataSource: DataSource) {
    super(VisaTypeEntity, dataSource.createEntityManager());
  }

  async findAllVisaTypes(): Promise<VisaTypeEntity[]> {
    return this.find();
  }

  async findById(id: number): Promise<VisaTypeEntity | null> {
    return this.findOne({
      where: { id },
    });
  }
}