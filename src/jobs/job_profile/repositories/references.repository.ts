import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { ReferenceEntity } from '../entities/references.entity';
import { CreateReferenceDto } from '../dtos/references.dto';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';

@Injectable()
export class ReferenceRepository {
  private readonly logger = new Logger(ReferenceRepository.name);

  constructor(
    @InjectRepository(ReferenceEntity)
    private readonly referenceRepository: Repository<ReferenceEntity>,
    @InjectRepository(UserJobProfile)
    private readonly userJobProfileRepository: Repository<UserJobProfile>,
  ) {}

  async findAll(): Promise<ReferenceEntity[]> {
    try {
      return this.referenceRepository.find({
        order: { created_at: 'DESC' },
        relations: ['userJobProfile'],
      });
    } catch (error) {
      this.logger.error(`Database error in findAll: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Database error while fetching references');
    }
  }

  async findById(id: number): Promise<ReferenceEntity> {
    try {
      const reference = await this.referenceRepository.findOne({
        where: { id },
        relations: ['userJobProfile'],
      });

      if (!reference) {
        throw new NotFoundException(`Reference with ID ${id} not found`);
      }

      return reference;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in findById: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Database error while fetching reference with ID ${id}`);
    }
  }

  async createReference(createDto: CreateReferenceDto): Promise<ReferenceEntity> {
    try {
      const { user_id, ...referenceData } = createDto;
      
      const userJobProfile = await this.userJobProfileRepository.findOne({ 
        where: { id: user_id } 
      });
      
      if (!userJobProfile) {
        throw new NotFoundException(`User job profile with ID ${user_id} not found`);
      }

      const now = new Date();
      
      const reference = this.referenceRepository.create({
        ...referenceData,
        user_id,
        created_at: now,
        updated_at: now,
        userJobProfile: userJobProfile,
      });

      return await this.referenceRepository.save(reference);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in createReference: ${error.message}`, error.stack);
      if (error instanceof QueryFailedError) {
        throw error;
      }
      throw new InternalServerErrorException('Database error while creating reference');
    }
  }

  async deleteReference(id: number): Promise<void> {
    try {
      const reference = await this.findById(id);
      await this.referenceRepository.remove(reference);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in deleteReference: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Database error while deleting reference with ID ${id}`);
    }
  }
}