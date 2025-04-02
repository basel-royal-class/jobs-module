import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { JobProfileService } from '../services/user-job.service';
import { CreateJobProfileDto } from '../../../core/dtos/user-job-profile.dto';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WasabiService } from '../services/wasabi.service';

@Controller('job-profile')
export class JobProfileController {
  constructor(
    private readonly jobProfileService: JobProfileService,
    private readonly uploadManager: WasabiService,
  ) {}

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

  @Put(':userId/upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfileImage(
    @Param('userId') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Received file:', file);
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {

      const imageUrl = await this.uploadManager.uploadFile(file, 'profiles');
      return await this.jobProfileService.uploadProfileImage(userId, imageUrl);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
