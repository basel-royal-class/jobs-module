import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceRepository } from '../repositories/experince.repository';

import { differenceInYears, differenceInMonths } from 'date-fns';
import { FormattedExperience } from '../types/index';
import {
  CompaniesResponseDto,
  CompanyWithExperiences,
  CreateExperienceDto,
} from '../dtos/experince.dto';

import { IndustriesRepository } from 'src/common/helpers/repositories/industry.repository';
import { CountriesRepository } from 'src/common/helpers/repositories/country.repository';
import { CitiesRepository } from 'src/common/helpers/repositories/city.repository';
import { JobCategoryRepository } from 'src/common/helpers/repositories/job-category.repository';
import { CompaniesRepository } from 'src/common/helpers/repositories/companies.repository';
import { UserJobRepository } from 'src/common/helpers/repositories/user-job.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly experienceRepository: ExperienceRepository,
    private readonly industriesRepository: IndustriesRepository, // Ensure this matches
    private readonly countriesRepository: CountriesRepository,
    private readonly citiesRepository: CitiesRepository,
    private readonly jobCategoryRepository: JobCategoryRepository,
    private readonly companiesRepository: CompaniesRepository,
    private readonly usersRepository: UserJobRepository,
  ) {}

  async createExperience(
    dto: CreateExperienceDto,
  ): Promise<{ success: boolean; data: FormattedExperience }> {
    if (dto.current_experience) {
      dto.end_date = null;
    }

    const experiences_year = this.calculateExperienceDuration(
      dto.start_date,
      dto.end_date,
      dto.current_experience,
    );

    const user = await this.usersRepository.findById(dto.user_id);
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.user_id} not found`);
    }

    const industry = await this.industriesRepository.findOne({
      where: { id: dto.industry_id },
    });
    const country = await this.countriesRepository.findCountryById(dto.country_id);
    const city = await this.citiesRepository.findCityById(dto.city_id);
    const jobCategory = dto.job_category
      ? await this.jobCategoryRepository.findOne({
          where: { id: dto.job_category },
        })
      : null;
    const company = await this.companiesRepository.findOne({
      where: { id: dto.company },
    });

    if (!industry || !country || !city || !company) {
      throw new Error('Invalid ID provided for one of the related entities.');
    }

    const experience = await this.experienceRepository.createExperience({
      type: dto.type,
      current_experience: dto.current_experience,
      job_title: dto.job_title,
      description: dto.description,
      experiences_year: experiences_year,
      start_date: new Date(dto.start_date),
      end_date: dto.end_date ? new Date(dto.end_date) : null,
      industry: industry,
      country: country,
      city: city,
      job_category: jobCategory || undefined,
      company: company,
      user: user,
    });

    return {
      success: true,
      data: experience,
    };
  }

  async findAll(): Promise<CompaniesResponseDto> {
    const experiences = await this.experienceRepository.findAllExperiences();

    const groupedByCompany: Record<number, CompanyWithExperiences> = experiences.reduce(
      (result, experience: FormattedExperience) => {
        const companyId = experience.company.id;

        if (!result[companyId]) {
          result[companyId] = {
            id: experience.company.id,
            name: experience.company.name,
            image: 'https://staging.5ynd.net/images/tie.svg',
            total_experience_years: '',
            experiences: [],
          };
        }

        result[companyId].experiences.push({
          id: experience.id,
          type: experience.type,
          current_experience: experience.current_experience,
          job_title: experience.job_title,
          description: experience.description,
          industry: experience.industry,
          country: experience.country,
          city: experience.city,
          job_category: experience.job_category,
          experiences_year: experience.experiences_year,
          start_date: experience.start_date,
          end_date: experience.end_date,
        });

        return result;
      },
      {} as Record<number, CompanyWithExperiences>,
    );

    // Calculate total experience years for each company
    const companiesWithExperiences = Object.values(groupedByCompany).map((company) => {
      let totalYears = 0;
      let totalMonths = 0;

      company.experiences.forEach((exp) => {
        if (typeof exp.experiences_year === 'string') {
          const yearsMatch = exp.experiences_year.match(/(\d+)\s+year/);
          const monthsMatch = exp.experiences_year.match(/(\d+)\s+month/);

          const years = yearsMatch && yearsMatch[1] ? parseInt(yearsMatch[1]) : 0;
          const months = monthsMatch && monthsMatch[1] ? parseInt(monthsMatch[1]) : 0;

          totalYears += years;
          totalMonths += months;
        } else if (typeof exp.experiences_year === 'number') {
          const wholePart = Math.floor(exp.experiences_year);
          const decimalPart = exp.experiences_year - wholePart;

          totalYears += wholePart;
          totalMonths += Math.round(decimalPart * 12);
        }
      });

      if (totalMonths >= 12) {
        totalYears += Math.floor(totalMonths / 12);
        totalMonths = totalMonths % 12;
      }

      let totalExperienceStr: string;
      if (totalYears > 0 && totalMonths > 0) {
        totalExperienceStr = `${totalYears} year${totalYears !== 1 ? 's' : ''} and ${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
      } else if (totalYears > 0) {
        totalExperienceStr = `${totalYears} year${totalYears !== 1 ? 's' : ''}`;
      } else if (totalMonths > 0) {
        totalExperienceStr = `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
      } else {
        totalExperienceStr = '0';
      }

      return {
        ...company,
        total_experience_years: totalExperienceStr,
      };
    });

    return {
      success: true,
      data: companiesWithExperiences,
    };
  }

  async findOne(id: number) {
    const experience = await this.experienceRepository.findExperienceById(id);

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    return {
      success: true,
      data: experience,
    };
  }

  private calculateExperienceDuration(
    startDate: string,
    endDate: string | null | undefined,
    currentExperience: boolean,
  ): string {
    const start = new Date(startDate);
    const end = currentExperience || !endDate ? new Date() : new Date(endDate);

    const years = differenceInYears(end, start);
    const months = differenceInMonths(end, start) % 12;

    return `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
  }
}
