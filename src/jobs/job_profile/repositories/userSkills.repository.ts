import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserSkill } from '../entities/skills/user.skill.entity';
import { UserSkillCompanies } from '../entities/skills/user.company.entity';
import { UserSkillSchools } from '../entities/skills/user.schools.entity';
import { SkillsEntity } from '../../../core/entities/skills.entity';
import { CompaniesEntity } from '../../../core/entities/company.entity';
import { SchoolsEntity } from '../../../core/entities/schools.entity';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';

@Injectable()
export class UserSkillsRepository {
  private readonly logger = new Logger(UserSkillsRepository.name);

  constructor(
    @InjectRepository(UserSkill)
    private readonly userSkillRepository: Repository<UserSkill>,
    @InjectRepository(UserSkillCompanies)
    private readonly userSkillCompaniesRepository: Repository<UserSkillCompanies>,
    @InjectRepository(UserSkillSchools)
    private readonly userSkillSchoolsRepository: Repository<UserSkillSchools>,
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
    @InjectRepository(CompaniesEntity)
    private readonly companiesRepository: Repository<CompaniesEntity>,
    @InjectRepository(SchoolsEntity)
    private readonly schoolsRepository: Repository<SchoolsEntity>,
    @InjectRepository(UserJobProfile)
    private readonly userJobProfileRepository: Repository<UserJobProfile>,
  ) {}

  async createUserSkill(skillId: number, companyIds: number[], schoolIds: number[], userId: number) {
    try {
      // Find the skill
      const skill = await this.skillsRepository.findOne({ where: { id: skillId } });
      if (!skill) {
        throw new Error('Skill not found');
      }

      // Find the user job profile
      const userJobProfile = await this.userJobProfileRepository.findOne({ where: { id: userId } });
      if (!userJobProfile) {
        throw new Error('User job profile not found');
      }

      const userSkill = new UserSkill();
      userSkill.skils = skill;
      userSkill.userJobProfile = userJobProfile; 
      const savedUserSkill = await this.userSkillRepository.save(userSkill);

      //companies
      if (companyIds && companyIds.length) {
        const companies = await this.companiesRepository.findByIds(companyIds);

        for (const company of companies) {
          const userSkillCompany = new UserSkillCompanies();
          userSkillCompany.companies = company;
          userSkillCompany.userSkills = savedUserSkill;
          await this.userSkillCompaniesRepository.save(userSkillCompany);
        }
      }

      //schools
      if (schoolIds && schoolIds.length) {
        const schools = await this.schoolsRepository.findByIds(schoolIds);

        for (const school of schools) {
          const userSkillSchool = new UserSkillSchools();
          userSkillSchool.schools = school;
          userSkillSchool.userSkills = savedUserSkill;
          await this.userSkillSchoolsRepository.save(userSkillSchool);
        }
      }

      return this.findUserSkillById(savedUserSkill.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in createUserSkill: ${error.message}`, error.stack);
      if (error instanceof QueryFailedError) {
        throw error;
      }
      throw new InternalServerErrorException('Database error while creating user skill');
    }
  }
  
  async findUserSkillById(id: number) {
    try {
      const userSkill = await this.userSkillRepository.findOne({
        where: { id },
        relations: ['skils', 'userJobProfile'],
      });

      if (!userSkill) {
        return null;
      }

      // Get companies
      const companies = await this.userSkillCompaniesRepository.find({
        where: { userSkills: { id: userSkill.id } },
        relations: ['companies'],
      });

      // Get schools
      const schools = await this.userSkillSchoolsRepository.find({
        where: { userSkills: { id: userSkill.id } },
        relations: ['schools'],
      });

      return {
        id: userSkill.id,
        skill_id: {
          id: userSkill.skils.id,
          name: userSkill.skils.value,
        },
        user_id: userSkill.userJobProfile ? userSkill.userJobProfile.id : null,
        companies: companies.map((company) => ({
          id: company.companies.id,
          name: company.companies.name || company.companies.name,
        })),
        schools: schools.map((school) => ({
          id: school.schools.id,
          name: school.schools.name || school.schools.name,
        })),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in findUserSkillById: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Database error while fetching user skill with ID ${id}`,
      );
    }
  }
  
  async findAllUserSkills() {
    try {
      const userSkills = await this.userSkillRepository.find({
        relations: ['skils', 'userJobProfile'],
        order: { id: 'DESC' },
      });

      const formattedUserSkills = await Promise.all(
        userSkills.map(async (userSkill) => {
          const companies = await this.userSkillCompaniesRepository.find({
            where: { userSkills: { id: userSkill.id } },
            relations: ['companies'],
          });

          const schools = await this.userSkillSchoolsRepository.find({
            where: { userSkills: { id: userSkill.id } },
            relations: ['schools'],
          });

          // Return formatted data
          return {
            id: userSkill.id,
            skill_id: {
              id: userSkill.skils.id,
              name: userSkill.skils.value,
            },
            user_id: userSkill.userJobProfile ? userSkill.userJobProfile.id : null,
            companies: companies.map((company) => ({
              id: company.companies.id,
              name: company.companies.name || company.companies.name,
            })),
            schools: schools.map((school) => ({
              id: school.schools.id,
              name: school.schools.name || school.schools.name,
            })),
          };
        }),
      );

      return formattedUserSkills;
    } catch (error) {
      this.logger.error(`Database error in findAllUserSkills: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Database error while fetching user skills');
    }
  }
  
  async deleteUserSkill(id: number): Promise<void> {
    try {
      const userSkill = await this.userSkillRepository.findOne({
        where: { id },
      });

      if (!userSkill) {
        throw new NotFoundException(`User skill with ID ${id} not found`);
      }

      await this.userSkillCompaniesRepository.delete({ userSkills: { id } });

      await this.userSkillSchoolsRepository.delete({ userSkills: { id } });

      await this.userSkillRepository.remove(userSkill);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in deleteUserSkill: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Database error while deleting user skill with ID ${id}`,
      );
    }
  }

  async updateUserSkill(id: number, skillId?: number, companyIds?: number[], schoolIds?: number[], userId?: number) {
    try {
      const userSkill = await this.userSkillRepository.findOne({
        where: { id },
        relations: ['skils', 'userJobProfile' ],
      });

      if (!userSkill) {
        throw new NotFoundException(`User skill with ID ${id} not found`);
      }

      if (skillId) {
        const skill = await this.skillsRepository.findOne({ where: { id: skillId } });
        if (!skill) {
          throw new NotFoundException(`Skill with ID ${skillId} not found`);
        }
        userSkill.skils = skill;
      }

      if (userId) {
        const userJobProfile = await this.userJobProfileRepository.findOne({ where: { id: userId } });
        if (!userJobProfile) {
          throw new NotFoundException(`User job profile with ID ${userId} not found`);
        }
        userSkill.userJobProfile = userJobProfile;
      }
      
      await this.userSkillRepository.save(userSkill);

      if (companyIds !== undefined) {
        await this.userSkillCompaniesRepository.delete({ userSkills: { id } });

        if (companyIds.length) {
          const companies = await this.companiesRepository.findByIds(companyIds);

          if (companies.length !== companyIds.length) {
            throw new NotFoundException('One or more companies not found');
          }

          for (const company of companies) {
            const userSkillCompany = new UserSkillCompanies();
            userSkillCompany.companies = company;
            userSkillCompany.userSkills = userSkill;
            await this.userSkillCompaniesRepository.save(userSkillCompany);
          }
        }
      }

      if (schoolIds !== undefined) {
        await this.userSkillSchoolsRepository.delete({ userSkills: { id } });

        if (schoolIds.length) {
          const schools = await this.schoolsRepository.findByIds(schoolIds);

          if (schools.length !== schoolIds.length) {
            throw new NotFoundException('One or more schools not found');
          }

          for (const school of schools) {
            const userSkillSchool = new UserSkillSchools();
            userSkillSchool.schools = school;
            userSkillSchool.userSkills = userSkill;
            await this.userSkillSchoolsRepository.save(userSkillSchool);
          }
        }
      }

      return this.findUserSkillById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Database error in updateUserSkill: ${error.message}`, error.stack);
      if (error instanceof QueryFailedError) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Database error while updating user skill with ID ${id}`,
      );
    }
  }
}