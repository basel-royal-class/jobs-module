import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { NationalityService } from '../services/nationality.service';
import { CreateNationalityDto, NationalityResponseDto } from '../../../core/dtos/nationality.dto';

@Controller('nationalities')
export class NationalityController {
  constructor(private readonly nationalityService: NationalityService) {}

  @Post()
  async create(@Body() createNationalityDto: CreateNationalityDto): Promise<NationalityResponseDto> {
    return await this.nationalityService.createNationality(createNationalityDto);
  }

  @Get()
  async findAll(): Promise<NationalityResponseDto> {
    return await this.nationalityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NationalityResponseDto> {
    return await this.nationalityService.findOne(+id);
  }


}