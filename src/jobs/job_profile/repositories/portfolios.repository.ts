import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PortfolioEntity } from '../entities/portfolios.entity';
import { CreatePortfolioDto } from '../dtos/portfolios.dto';

@Injectable()
export class PortfolioRepository extends Repository<PortfolioEntity> {
  private readonly logger = new Logger(PortfolioRepository.name);

  constructor(private dataSource: DataSource) {
    super(PortfolioEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<PortfolioEntity[]> {
    try {
      return await this.find({
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Database error in findAll: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Database error while fetching portfolios');
    }
  }

  async findByUserJobProfileId(userJobProfileId: number): Promise<PortfolioEntity[]> {
    try {
      return await this.find({
        where: { userJobProfileId },
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Database error in findByUserJobProfileId: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Database error while fetching portfolios for profile with ID ${userJobProfileId}`
      );
    }
  }

  async findById(id: number): Promise<PortfolioEntity> {
    try {
      const portfolio = await this.findOneBy({ id });

      if (!portfolio) {
        throw new NotFoundException(`Portfolio with ID ${id} not found`);
      }

      return portfolio;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in findById: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Database error while fetching portfolio with ID ${id}`
      );
    }
  }

  async findOneByNameAndProfileId(name: string, userJobProfileId: number): Promise<PortfolioEntity | null> {
    try {
      return await this.findOne({
        where: {
          name,
          userJobProfileId
        }
      });
    } catch (error) {
      this.logger.error(`Database error in findOneByNameAndProfileId: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Database error while checking portfolio existence');
    }
  }

  async findOneByLink(link: string): Promise<PortfolioEntity | null> {
    try {
      return await this.findOne({
        where: { link }
      });
    } catch (error) {
      this.logger.error(`Database error in findOneByLink: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Database error while checking portfolio link');
    }
  }

  async createPortfolio(createDto: CreatePortfolioDto): Promise<PortfolioEntity> {
    try {
      const now = new Date();

      const portfolio = this.create({
        name: createDto.name,
        link: createDto.link,
        userJobProfileId: createDto.user_id,
        created_at: now,
        updated_at: now,
      });

      return await this.save(portfolio);
    } catch (error) {
      this.logger.error(`Database error in createPortfolio: ${error.message}`, error.stack);
      throw error;
    }
  }

  async deletePortfolio(id: number): Promise<void> {
    try {
      const portfolio = await this.findById(id);
      await this.remove(portfolio);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in deletePortfolio: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Database error while deleting portfolio with ID ${id}`
      );
    }
  }
}