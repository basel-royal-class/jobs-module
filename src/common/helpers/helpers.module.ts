
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { DegreesEntity } from '../../core/entities/degrees.entity';
import { SchoolsEntity } from '../../core/entities/schools.entity';
import { CompaniesEntity } from '../../core/entities/company.entity';
import { IndustriesEntity } from '../../core/entities/industries.entity';
import { CountryEntity } from '../../core/entities/countries.entity';
import { CityEntity } from '../../core/entities/cities.entity';
import { JobCategoryEntity } from '../../core/entities/job-category.entity';
import { SkillsEntity } from '../../core/entities/skills.entity';
import { Experience } from 'src/jobs/job_profile/entities/experince.entity';
import { UserJobProfile } from 'src/core/entities/user-job-profile.entity';

// Controllers
import { MapboxController } from './controllers/mapbox.controller';
import { WasabiController } from './controllers/wasabi.controller';
import { SearchController } from './controllers/search.controller';
import { CountriesController } from './controllers/country.controller';
import { CitiesController } from './controllers/city.controller';
import { SkillsController } from './controllers/skills.controller';
import { CompaniesController } from './controllers/companies.controller';
import { IndustriesController } from './controllers/industry.controller';
import { JobCategoryController } from './controllers/job-category.controller';

// Services
import { WasabiService } from './services/wasabi.service';
import { MapboxService } from './services/mapbox.service';
import { SearchService } from './services/search.service';
import { CountriesService } from './services/country.service';
import { CitiesService } from './services/cities.service';
import { SkillsService } from './services/skills.service';
import { CompaniesService } from './services/companies.service';
import { IndustriesService } from './services/industry.service';
import { JobCategoryService } from './services/job-category.service';
// import { UsersService } from './services/user-job-profile.service';

// Repositories
import { SkillsRepository } from './repositories/skills.repository';
import { CompaniesRepository } from './repositories/companies.repository';
import { IndustriesRepository } from './repositories/industry.repository';
import { JobCategoryRepository } from './repositories/job-category.repository';
// import { UsersRepository } from './repositories/user.repository';
import { CountriesRepository } from './repositories/country.repository';
import { CitiesRepository } from './repositories/city.repository';
import { Nationality } from 'src/core/entities/nationality.entity';
import { NationalityController } from './controllers/nationality.controller';
import { NationalityService } from './services/nationality.service';
import { NationalityRepository } from './repositories/nationlity.repository';
import { LanguageEntity } from 'src/core/entities/language.entity';
import { LanguagesController } from './controllers/languages.controller';
import { LanguageService } from './services/languages.service';
import { LanguageRepository } from './repositories/language.repository';
import { User } from 'src/core/entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { UserJobRepository } from './repositories/user-job.repository';
import { JobProfileService } from './services/user-job.service';
import { VisaTypeRepository } from 'src/jobs/job_profile/repositories/visa.repository';
import { JobProfileController } from './controllers/user-job-profile.controller';
import { UserSkillSchools } from 'src/jobs/job_profile/entities/skills/user.schools.entity';
import { UserSkillCompanies } from 'src/jobs/job_profile/entities/skills/user.company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DegreesEntity,
      SchoolsEntity,
      CompaniesEntity,
      IndustriesEntity,
      CountryEntity,
      CityEntity,
      JobCategoryEntity,
      SkillsEntity,
      Experience,
      UserJobProfile,
      Nationality,
      LanguageEntity,
      User,
      UserSkillCompanies, 
      UserSkillSchools,  
      
    ]),
  ],
  controllers: [
    MapboxController,
    WasabiController,
    SearchController,
    CountriesController,
    CitiesController,
    SkillsController,
    CompaniesController,
    IndustriesController,
    JobCategoryController,
    UserController,
    NationalityController,
    LanguagesController, 
    JobProfileController
  ],
  providers: [
    // Services
    WasabiService,
    MapboxService,
    SearchService,
    CountriesService,
    CitiesService,
    SkillsService,
    CompaniesService,
    IndustriesService,
    JobCategoryService,
    UserService,
    NationalityService,
    LanguageService,
    JobProfileService ,

    // Repositories
    SkillsRepository,
    CompaniesRepository,
    IndustriesRepository,
    JobCategoryRepository,
    UserRepository,
    CountriesRepository,
    CitiesRepository,
    NationalityRepository,
    LanguageRepository,
    UserJobRepository ,
    VisaTypeRepository
  ],
  exports: [
    UserRepository,
    CompaniesRepository,
    CountriesRepository,
    CitiesRepository,
    IndustriesRepository,
    JobCategoryRepository,
    NationalityRepository,
    LanguageRepository,
    UserJobRepository ,
    VisaTypeRepository
  ],
})
export class HelpersModule {}
