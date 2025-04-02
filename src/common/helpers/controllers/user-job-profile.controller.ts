import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { JobProfileService } from '../services/user-job.service';
import { CreateJobProfileDto } from '../../../core/dtos/user-job-profile.dto';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';

@Controller('job-profile')
export class JobProfileController {
  constructor(private readonly jobProfileService: JobProfileService) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<any> {
    try {
      return await this.jobProfileService.findByUserId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<UserJobProfile> {
    try {
      return await this.jobProfileService.findByProfileId(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() createJobProfileDto: CreateJobProfileDto): Promise<UserJobProfile> {
    return this.jobProfileService.createOrUpdateJobProfile(createJobProfileDto);
  }
}