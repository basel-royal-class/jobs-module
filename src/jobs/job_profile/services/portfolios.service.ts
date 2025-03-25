import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PortfolioRepository } from '../repositories/portfolios.repository';
import { PortfolioEntity } from '../entities/portfolios.entity';
import { CreatePortfolioDto } from '../dtos/portfolios.dto';

@Injectable()
export class PortfolioService {
  private readonly logger = new Logger(PortfolioService.name);
  constructor(private portfolioRepository: PortfolioRepository) {}

  async findAll(): Promise<PortfolioEntity[]> {
    this.logger.log('Fetching all portfolios');
    try {
      return await this.portfolioRepository.findAll();
    } catch (error) {
      this.logger.error(`Error fetching portfolios: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findById(id: number): Promise<PortfolioEntity> {
    this.logger.log(`Fetching portfolio with id: ${id}`);
    try {
      return await this.portfolioRepository.findById(id);
    } catch (error) {
      this.logger.error(`Error fetching portfolio with id ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }
  async create(createPortfolioDto: CreatePortfolioDto): Promise<PortfolioEntity> {
    this.logger.log('Creating new portfolio');
    try {
      const existingPortfolioWithName = await this.portfolioRepository.findOneBy({
        user_id: createPortfolioDto.user_id,
        name: createPortfolioDto.name,
      });
      if (existingPortfolioWithName) {
        throw new ConflictException(
          `You already have a portfolio named "${createPortfolioDto.name}"`,
        );
      }

      const existingPortfolioWithLink = await this.portfolioRepository.findOneBy({
        link: createPortfolioDto.link,
      });

      if (existingPortfolioWithLink) {
        throw new ConflictException(`The link "${createPortfolioDto.link}" is already in use`);
      }

      return await this.portfolioRepository.createPortfolio(createPortfolioDto);
    } catch (error) {
      this.logger.error(`Error creating portfolio: ${error.message}`, error.stack);

      if (error instanceof ConflictException) {
        throw error;
      }

      if (error.code === '23505') {
        if (error.detail?.includes('name')) {
          throw new ConflictException('You already have a portfolio with this name');
        } else if (error.detail?.includes('link')) {
          throw new ConflictException('This portfolio link is already in use');
        } else {
          throw new ConflictException('A portfolio with these details already exists');
        }
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting portfolio with id: ${id}`);
    try {
      await this.portfolioRepository.deletePortfolio(id);
    } catch (error) {
      this.logger.error(`Error deleting portfolio with id ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }
}
