import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { VisaTypeService } from '../services/visa.service';
import { VisaResponseDto } from '../dtos/visa.dto';

@Controller('visa-types')
export class VisaTypeController {
  constructor(private readonly visaTypeService: VisaTypeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllVisaTypes(): Promise<VisaResponseDto> {
    return this.visaTypeService.findAll();
  }
}
