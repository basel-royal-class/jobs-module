// src/cities/cities.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CitiesService } from '../services/cities.service';
import { CityResponseDto, CitysResponseDto } from '../../../core/dtos/city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll(): Promise<CitysResponseDto> {
    const data = await this.citiesService.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CityResponseDto> {
    const data = await this.citiesService.findOne(+id);
    return {
      success: true,
      data,
    };
  }

  @Get('get_cities_by_country/:countryId')
  async findByCountry(@Param('countryId') countryId: string): Promise<CitysResponseDto> {
    const data = await this.citiesService.findByCountry(+countryId);
    return {
      success: true,
      data,
    };
  }
}
