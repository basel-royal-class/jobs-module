import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationsEntity } from '../entities/qualification.entity';
import { DegreesEntity } from '../../../core/entities/degrees.entity';
import { SchoolsEntity } from '../../../core/entities/schools.entity';
import { CityEntity } from '../../../core/entities/cities.entity';
import { CountryEntity } from '../../../core/entities/countries.entity';
import { QualificationsController } from '../controllers/qualifications.controller';
import { QualificationsService } from '../services/qualifications.service';
import { QualificationsRepository } from '../repositories/qualifications.repository';
import { Users } from 'src/core/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QualificationsEntity, DegreesEntity, SchoolsEntity, CityEntity, CountryEntity, Users]
  )],
  controllers: [QualificationsController],
  providers: [QualificationsRepository, QualificationsService],
})

export class QualificationsModule { }
