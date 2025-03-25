import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CertificationEntity } from '../entities/certification.entity';
import { CreateCertificationDto } from '../dtos/certification.dto';

@Injectable()
export class CertificationRepository extends Repository<CertificationEntity> {
  private readonly logger = new Logger(CertificationRepository.name);
  constructor(private dataSource: DataSource) {
    super(CertificationEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<CertificationEntity[]> {
    try {
      return await this.find({
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Database error in findAll: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Database error while fetching certifications');
    }
  }

  async findById(id: number): Promise<CertificationEntity> {
    try {
      const certification = await this.findOneBy({ id });

      if (!certification) {
        throw new NotFoundException(`Certification with ID ${id} not found`);
      }

      return certification;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in findById: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Database error while fetching certification with ID ${id}`,
      );
    }
  }

  async createCertification(createDto: CreateCertificationDto): Promise<CertificationEntity> {
    try {
      const now = new Date();

      const certification = this.create({
        ...createDto,
        created_at: now,
        updated_at: now,
      });

      return await this.save(certification);
    } catch (error) {
      this.logger.error(`Database error in createCertification: ${error.message}`, error.stack);
      if (error instanceof QueryFailedError) {
        throw error;
      }
      throw new InternalServerErrorException('Database error while creating certification');
    }
  }

  async deleteCertification(id: number): Promise<void> {
    try {
      const certification = await this.findById(id);
      await this.remove(certification);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in deleteCertification: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Database error while deleting certification with ID ${id}`,
      );
    }
  }
}
