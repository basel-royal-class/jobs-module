import { Module } from '@nestjs/common';
import { QualificationsEntity } from './entities/qualification.entity';
import { DegreesEntity } from 'src/core/entities/degrees.entity';
import { SchoolsEntity } from 'src/core/entities/schools.entity';
import { CityEntity } from 'src/core/entities/cities.entity';
import { CountryEntity } from 'src/core/entities/countries.entity';
import { Users } from 'src/core/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationsService } from './services/qualifications.service';
import { QualificationsRepository } from './repositories/qualifications.repository';
import { QualificationsController } from './controllers/qualifications.controller';
import { ResumesController } from './controllers/resumes.controller';
import { ResumesService } from './services/resumes.service';
import { ResumesRepository } from './repositories/resumes.repository';
import { ResumeEntity } from './entities/resume.entity';
import { SkillsService } from './services/skills.service';
import { SkillsController } from './controllers/skills.controller';
import { SkillsRepository } from './repositories/skills.repository';
import { HelpersModule } from 'src/common/helpers/helpers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Users,
            CityEntity,
            CountryEntity,
            SchoolsEntity,
            DegreesEntity,
            ResumeEntity,
            QualificationsEntity,
        ]),
        HelpersModule,

    ],
    controllers: [
        QualificationsController,
        ResumesController,
        SkillsController
    ],
    providers: [
        ResumesRepository,
        ResumesService,
        QualificationsRepository,
        QualificationsService,
        SkillsService,
        SkillsRepository
    ]
})
export class JobProfileModule { }
