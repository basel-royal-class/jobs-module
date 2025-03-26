import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSkill } from '../entities/skills/user.skill.entity';
import { UserSkillCompanies } from '../entities/skills/user.company.entity';
import { UserSkillSchools } from '../entities/skills/user.schools.entity';
import { SkillsEntity } from '../../../core/entities/skills.entity';
import { CompaniesEntity } from '../../../core/entities/company.entity';
import { SchoolsEntity } from '../../../core/entities/schools.entity';

@Injectable()
export class UserSkillsRepository {
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
  ) {}

  async createUserSkill(skillId: number, companyIds: number[], schoolIds: number[]) {
    // Find the skill
    const skill = await this.skillsRepository.findOne({ where: { id: skillId } });
    if (!skill) {
      throw new Error('Skill not found');
    }

    // Create user skill
    const userSkill = new UserSkill();
    userSkill.skils = skill;
    const savedUserSkill = await this.userSkillRepository.save(userSkill);

    // Associate companies
    if (companyIds && companyIds.length) {
      const companies = await this.companiesRepository.findByIds(companyIds);

      for (const company of companies) {
        const userSkillCompany = new UserSkillCompanies();
        userSkillCompany.companies = company;
        userSkillCompany.userSkills = savedUserSkill;
        await this.userSkillCompaniesRepository.save(userSkillCompany);
      }
    }

    // Associate schools
    if (schoolIds && schoolIds.length) {
      const schools = await this.schoolsRepository.findByIds(schoolIds);

      for (const school of schools) {
        const userSkillSchool = new UserSkillSchools();
        userSkillSchool.schools = school;
        userSkillSchool.userSkills = savedUserSkill;
        await this.userSkillSchoolsRepository.save(userSkillSchool);
      }
    }

    // Return the created user skill with relations
    return this.findUserSkillById(savedUserSkill.id);
  }

  async findUserSkillById(id: number) {
    const userSkill = await this.userSkillRepository.findOne({
      where: { id },
      relations: ['skils'],
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
      companies: companies.map((company) => ({
        id: company.companies.id,
        name: company.companies.name || company.companies.name, 
      })),
      schools: schools.map((school) => ({
        id: school.schools.id,
        name: school.schools.name || school.schools.name, 
      })),
    };
  }
}
