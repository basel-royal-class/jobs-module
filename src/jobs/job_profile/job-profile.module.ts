import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Users } from 'src/core/entities/users.entity';
import { SchoolsEntity } from 'src/core/entities/schools.entity';
import { DegreesEntity } from 'src/core/entities/degrees.entity';
import { ResumeEntity } from './entities/resume.entity';
import { QualificationsEntity } from './entities/qualification.entity';
import { VisaTypeEntity } from './entities/visa.entity';
import { ReferenceEntity } from './entities/references.entity';
import { CertificationEntity } from './entities/certification.entity';
import { PortfolioEntity } from './entities/portfolios.entity';
import { Experience } from './entities/experince.entity';

// Repositories
import { ExperienceRepository } from './repositories/experince.repository';
import { UsersRepository } from 'src/common/helpers/repositories/user.repository';

// Repositories from helpers module
import { IndustriesRepository } from 'src/common/helpers/repositories/industry.repository';
import { CountriesRepository } from 'src/common/helpers/repositories/country.repository';
import { CitiesRepository } from 'src/common/helpers/repositories/city.repository';
import { JobCategoryRepository } from 'src/common/helpers/repositories/job-category.repository';
import { CompaniesRepository } from 'src/common/helpers/repositories/companies.repository';

// Controllers
import { VisaTypeController } from './controllers/visa.controller';
import { ReferenceController } from './controllers/references.controller';
import { CertificationController } from './controllers/certification.controller';
import { PortfolioController } from './controllers/portfolios.controller';
import { ExperienceController } from './controllers/experince.controller';

// Services
import { WasabiService } from 'src/common/helpers/services/wasabi.service';
import { VisaTypeService } from './services/visa.service';
import { ReferenceService } from './services/references.service';
import { CertificationService } from './services/certification.service';
import { PortfolioService } from './services/portfolios.service';
import { ExperienceService } from './services/experince.service';
import { UsersService } from 'src/common/helpers/services/user.service';

// Services from helpers module
import { IndustriesService } from 'src/common/helpers/services/industry.service';
import { CountriesService } from 'src/common/helpers/services/country.service';
import { CitiesService } from 'src/common/helpers/services/cities.service';
import { JobCategoryService } from 'src/common/helpers/services/job-category.service';
import { CompaniesService } from 'src/common/helpers/services/companies.service';

// Import HelpersModule to ensure all dependencies are available
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { ReferenceRepository } from './repositories/references.repository';
import { CertificationRepository } from './repositories/certifications.repository';
import { PortfolioRepository } from './repositories/portfolios.repository';
import { VisaTypeRepository } from './repositories/visa.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      SchoolsEntity,
      DegreesEntity,
      ResumeEntity,
      QualificationsEntity,
      VisaTypeEntity,
      ReferenceEntity,
      CertificationEntity,
      PortfolioEntity,
      Experience,
    ]),
    HelpersModule, 
  ],
  controllers: [
    VisaTypeController,
    ReferenceController,
    CertificationController,
    PortfolioController,
    ExperienceController,
  ],
  providers: [
    // Repositories
    ExperienceRepository,
    UsersRepository,
    ReferenceRepository,
    CertificationRepository ,
    PortfolioRepository ,
    VisaTypeRepository ,
    

    // Services
    ReferenceService,
    CertificationService,
    PortfolioService,
    ExperienceService,
    UsersService,
    VisaTypeService

  ],
  exports: [ExperienceService, ExperienceRepository],
})
export class JobProfileModule {}
