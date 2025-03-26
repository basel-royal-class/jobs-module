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


// Import HelpersModule to ensure all dependencies are available
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { ReferenceRepository } from './repositories/references.repository';
import { CertificationRepository } from './repositories/certifications.repository';
import { PortfolioRepository } from './repositories/portfolios.repository';
import { VisaTypeRepository } from './repositories/visa.repository';
import { UserSkill } from './entities/skills/user.skill.entity';
import { UserSkillController } from './controllers/userSkills.controller';
import { SkillsEntity } from 'src/core/entities/skills.entity';
import { CompaniesEntity } from 'src/core/entities/company.entity';
import { UserSkillCompanies } from './entities/skills/user.company.entity';
import { UserSkillSchools } from './entities/skills/user.schools.entity';
import { UserSkillsRepository } from './repositories/userSkills.repository';
import { UserSkillsService } from './services/userSkills.service';

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
      UserSkill ,
      SkillsEntity, 
      CompaniesEntity, 
      UserSkillCompanies ,
      UserSkillSchools

    ]),
    HelpersModule, 
  ],
  controllers: [
    VisaTypeController,
    ReferenceController,
    CertificationController,
    PortfolioController,
    ExperienceController,
    UserSkillController
  ],
  providers: [
    // Repositories
    ExperienceRepository,
    UsersRepository,
    ReferenceRepository,
    CertificationRepository ,
    PortfolioRepository ,
    VisaTypeRepository ,
    UserSkillsRepository ,
    
    

    // Services
    ReferenceService,
    CertificationService,
    PortfolioService,
    ExperienceService,
    UsersService,
    VisaTypeService ,
    UserSkillsService

  ],
  exports: [ExperienceService, ExperienceRepository ],
})
export class JobProfileModule {}
