import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ExperienceService } from '../services/experince.service';
import { CreateExperienceDto } from '../dtos/experince.dto';


@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async createExperience(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.createExperience(createExperienceDto);
  }

  @Get()
  async findAll() {
    return this.experienceService.findAll();
  }
}
