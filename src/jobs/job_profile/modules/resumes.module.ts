import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WasabiModule } from 'src/common/helpers/modules/wasabi.module';
import { ResumesController } from '../controllers/resumes.controller';
import { ResumesRepository } from '../repositories/resumes.repository';
import { ResumesService } from '../services/resumes.service';
import { ResumeEntity } from '../entities/resume.entity';
import { Users } from 'src/core/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeEntity, Users]), WasabiModule],
  controllers: [ResumesController],
  providers: [ResumesRepository, ResumesService],
})
export class ResumesModule { }
