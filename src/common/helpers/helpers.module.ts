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
import { Users } from 'src/core/entities/users.entity';

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
import { UsersController } from './controllers/user.controller';

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
import { UsersService } from './services/user.service';

// Repositories
import { SkillsRepository } from './repositories/skills.repository';
import { CompaniesRepository } from './repositories/companies.repository';
import { IndustriesRepository } from './repositories/industry.repository';
import { JobCategoryRepository } from './repositories/job-category.repository';
import { UsersRepository } from './repositories/user.repository';
import { CountriesRepository } from './repositories/country.repository';
import { CitiesRepository } from './repositories/city.repository';
import { Nationality } from 'src/core/entities/nationality.entity';

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
      Users,
      Nationality
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
    UsersController,
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
    UsersService,

    // Repositories
    SkillsRepository,
    CompaniesRepository,
    IndustriesRepository,
    JobCategoryRepository,
    UsersRepository,
    CountriesRepository,
    CitiesRepository,
  ],
  exports: [
    UsersRepository,
    CompaniesRepository,
    CountriesRepository,
    CitiesRepository,
    IndustriesRepository, 
    JobCategoryRepository,
  ],
})
export class HelpersModule {}