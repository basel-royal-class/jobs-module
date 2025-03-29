import { Controller, Post, Body } from '@nestjs/common';
import { JobProfileService } from '../services/user-job.service';
import { CreateJobProfileDto } from '../../../core/dtos/user-job-profile.dto';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';

@Controller('job-profile')
export class JobProfileController {
  constructor(private readonly jobProfileService: JobProfileService) {}

  @Post()
  async create(@Body() createJobProfileDto: CreateJobProfileDto): Promise<UserJobProfile> {
    return this.jobProfileService.createOrUpdateJobProfile(createJobProfileDto);
  }
}