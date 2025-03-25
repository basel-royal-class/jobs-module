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

  async createPortfolio(createDto: CreatePortfolioDto): Promise<PortfolioEntity> {
    try {
      const now = new Date();

      const portfolio = this.create({
        ...createDto,
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