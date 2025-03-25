import { Injectable, Logger, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CertificationRepository } from '../repositories/certifications.repository';
import { CertificationEntity } from '../entities/certification.entity';
import { CreateCertificationDto } from '../dtos/certification.dto';

@Injectable()
export class CertificationService {
  private readonly logger = new Logger(CertificationService.name);
  constructor(private certificationRepository: CertificationRepository) {}

  async findAll(): Promise<CertificationEntity[]> {
    this.logger.log('Fetching all certifications');
    try {
      return await this.certificationRepository.findAll();
    } catch (error) {
      this.logger.error(`Error fetching certifications: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findById(id: number): Promise<CertificationEntity> {
    this.logger.log(`Fetching certification with id: ${id}`);
    try {
      return await this.certificationRepository.findById(id);
    } catch (error) {
      this.logger.error(
        `Error fetching certification with id ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async create(createCertificationDto: CreateCertificationDto): Promise<CertificationEntity> {
    this.logger.log('Creating new certification');
    try {
      const existingCertification = await this.certificationRepository.findOneBy({
        course_name: createCertificationDto.course_name,
      });

      if (existingCertification) {
        throw new BadRequestException(
          `A certification with name "${createCertificationDto.course_name}" already exists`,
        );
      }

      return await this.certificationRepository.createCertification(createCertificationDto);
    } catch (error) {
      this.logger.error(`Error creating certification: ${error.message}`, error.stack);

      if (error.code === '23505') {
        throw new BadRequestException('A certification with this name already exists');
      }

      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create certification');
    }
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting certification with id: ${id}`);
    try {
      await this.certificationRepository.deleteCertification(id);
    } catch (error) {
      this.logger.error(
        `Error deleting certification with id ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
