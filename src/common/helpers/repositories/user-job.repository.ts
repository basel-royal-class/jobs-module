import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSkillCompanies } from '../../../jobs/job_profile/entities/skills/user.company.entity';
import { UserSkillSchools } from '../../../jobs/job_profile/entities/skills/user.schools.entity';

@Injectable()
export class UserJobRepository {
  constructor(
    @InjectRepository(UserJobProfile)
    private readonly repository: Repository<UserJobProfile>,
    @InjectRepository(UserSkillCompanies)
    private readonly userSkillCompaniesRepository: Repository<UserSkillCompanies>,
    @InjectRepository(UserSkillSchools)
    private readonly userSkillSchoolsRepository: Repository<UserSkillSchools>,
  ) {}

  async findById(profileId: number): Promise<any> {
    const profile = await this.repository.findOne({
      where: { id: profileId },
      relations: [
        'user',
        'experiences',
        'experiences.company',
        'experiences.industry',
        'experiences.job_category',
        'languages',
        'visa',
        'country',
        'city',
        'portfolios',
        'skills',
        'skills.skils',
      ],
    });

    if (!profile) {
      return null;
    }

    const enhancedSkills = await Promise.all(
      profile.skills.map(async (skill) => {
        // Get companies for this skill
        const companies = await this.userSkillCompaniesRepository.find({
          where: { userSkills: { id: skill.id } },
          relations: ['companies'],
        });

        const schools = await this.userSkillSchoolsRepository.find({
          where: { userSkills: { id: skill.id } },
          relations: ['schools'],
        });

        return {
          ...skill,
          companies: companies.map((company) => ({
            id: company.companies.id,
            name: company.companies.name,
          })),
          schools: schools.map((school) => ({
            id: school.schools.id,
            name: school.schools.name,
          })),
        };
      }),
    );

    return {
      ...profile,
      skills: enhancedSkills,
    };
  }

  async findByUserId(userId: number): Promise<any> {
    const profile = await this.repository.findOne({
      where: { user: { id: userId } },
      relations: [
        'user',
        'experiences',
        'experiences.company',
        'experiences.industry',
        'experiences.job_category',
        'languages',
        'visa',
        'country',
        'city',
        'portfolios',
        'skills',
        'skills.skils',
      ],
    });

    if (!profile) {
      return null;
    }

    const enhancedSkills = await Promise.all(
      profile.skills.map(async (skill) => {
        const companies = await this.userSkillCompaniesRepository.find({
          where: { userSkills: { id: skill.id } },
          relations: ['companies'],
        });

        const schools = await this.userSkillSchoolsRepository.find({
          where: { userSkills: { id: skill.id } },
          relations: ['schools'],
        });

        return {
          ...skill,
          companies: companies.map((company) => ({
            id: company.companies.id,
            name: company.companies.name,
          })),
          schools: schools.map((school) => ({
            id: school.schools.id,
            name: school.schools.name,
          })),
        };
      }),
    );

    return {
      ...profile,
      skills: enhancedSkills,
    };
  }

  async saveProfile(profile: UserJobProfile): Promise<UserJobProfile> {
    return this.repository.save(profile);
  }
}
