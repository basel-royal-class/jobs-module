import {
  Get,
  Post,
  Body,
  Param,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  Logger,
  UseFilters,
} from '@nestjs/common';
import { CertificationService } from '../services/certification.service';
import { CreateCertificationDto } from '../dtos/certification.dto';
import { HttpExceptionFilter } from '../../../common/utils/http-exception.filter';

@Controller('certifications')
@UseFilters(new HttpExceptionFilter())
export class CertificationController {
  private readonly logger = new Logger(CertificationController.name);

  constructor(private readonly certificationService: CertificationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCertificationDto: CreateCertificationDto) {
    try {
      const data = await this.certificationService.create(createCertificationDto);
      return {
        success: true,
        data,
      };
    } catch (error) {
      this.logger.error(`Failed to create certification: ${error.message}`, error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create certification');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const certifications = await this.certificationService.findAll();
      return {
        success: true,
        data: certifications,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch certifications: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch certifications');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const certification = await this.certificationService.findById(id);
      return {
        success: true,
        data: certification,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch certification: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch certification');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.certificationService.delete(id);
      return {
        success: true,
        message: 'Certification deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Failed to delete certification: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete certification');
    }
  }
}
