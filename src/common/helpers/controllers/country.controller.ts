// src/countries/countries.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { CountriesService } from '../services/country.service';
import { CountryResponseDto , CountriesResponseDto } from '../../../core/dtos/country.dto';


@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async findAll(): Promise<CountriesResponseDto> {
    const data = await this.countriesService.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CountryResponseDto> {
    const data = await this.countriesService.findOne(+id);
    return {
      success: true,
      data,
    };
  }
}