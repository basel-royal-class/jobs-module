import { Controller, Get, Param, Query } from '@nestjs/common';
import { LanguageService } from '../services/languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  async findAll() {
    try {
      const companies = await this.languageService.findAllLanguages();
      return {
        success: true,
        data: companies,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('search')
  async findByValue(@Query('search') searchTerm: string) {
    try {
      const companies = await this.languageService.findLanguagesBySearchTerm(searchTerm);
      return {
        success: true,
        data: companies,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findLanguageById(@Param('id') id: number) {
    try {
      const language = await this.languageService.findLanguagesById(id);
      if (!language) {
        return {
          success: false,
          message: `Company with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: language,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
