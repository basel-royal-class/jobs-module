import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    HttpCode, 
    HttpStatus, 
    Delete, 
    ParseIntPipe, 
    Logger,
    UseFilters,
    InternalServerErrorException,
    NotFoundException
  } from '@nestjs/common';
  import { PortfolioService } from '../services/portfolios.service';
  import { CreatePortfolioDto } from '../dtos/portfolios.dto';
  import { HttpExceptionFilter } from '../../../common/utils/http-exception.filter';
  
  @Controller('portfolios')
  @UseFilters(new HttpExceptionFilter())
  export class PortfolioController {
    private readonly logger = new Logger(PortfolioController.name);
  
    constructor(private readonly portfolioService: PortfolioService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPortfolioDto: CreatePortfolioDto) {
      try {
        const data = await this.portfolioService.create(createPortfolioDto);
        return {
          success: true,
          data,
        };
      } catch (error) {
        this.logger.error(`Failed to create portfolio: ${error.message}`, error.stack);
        if (error.status) {
          throw error;
        }
        throw new InternalServerErrorException('Failed to create portfolio');
      }
    }
  
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
      try {
        const data = await this.portfolioService.findAll();
        return {
          success: true,
          data,
        };
      } catch (error) {
        this.logger.error(`Failed to fetch portfolios: ${error.message}`, error.stack);
        throw new InternalServerErrorException('Failed to fetch portfolios');
      }
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number) {
      try {
        const data = await this.portfolioService.findById(id);
        return {
          success: true,
          data,
        };
      } catch (error) {
        this.logger.error(`Failed to fetch portfolio: ${error.message}`, error.stack);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Failed to fetch portfolio');
      }
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseIntPipe) id: number) {
      try {
        await this.portfolioService.delete(id);
        return {
          success: true,
          message: 'Portfolio deleted successfully',
        };
      } catch (error) {
        this.logger.error(`Failed to delete portfolio: ${error.message}`, error.stack);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Failed to delete portfolio');
      }
    }
  }