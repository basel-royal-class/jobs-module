// src/jobs/job-profile/services/job-profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobProfileDto } from '../../../core/dtos/user-job-profile.dto';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import { UserJobRepository } from '../repositories/user-job.repository';
import { CountriesRepository } from '../repositories/country.repository';
import { CitiesRepository } from '../repositories/city.repository';
import { LanguageRepository } from '../repositories/language.repository';
import { VisaTypeRepository } from 'src/jobs/job_profile/repositories/visa.repository';
import { UserRepository } from '../repositories/user.repository';
import { FormattedJobProfile } from 'src/jobs/job_profile/types';

@Injectable()
export class JobProfileService {
  constructor(
    private userJobRepository: UserJobRepository,
    private readonly userRepository: UserRepository,
    private visaRepository: VisaTypeRepository,
    private countryRepository: CountriesRepository,
    private cityRepository: CitiesRepository,
    private languageRepository: LanguageRepository,
  ) {}

  async findByProfileId(profileId: number): Promise<UserJobProfile> {
    const profile = await this.userJobRepository.findById(profileId);
    if (!profile) {
      throw new NotFoundException(`Job profile for user with ID ${profileId} not found`);
    }
    return profile;
  }

  async createOrUpdateJobProfile(
    createJobProfileDto: CreateJobProfileDto,
  ): Promise<UserJobProfile> {
    const { user_id, visa_id, country, city, languages, ...profileData } = createJobProfileDto;

    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: ['jobProfile'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    let jobProfile = await this.userJobRepository.findByUserId(user_id);

    if (jobProfile) {
      Object.assign(jobProfile, profileData);
    } else {
      jobProfile = new UserJobProfile();
      Object.assign(jobProfile, profileData);
      jobProfile.user = user;
    }

    if (visa_id) {
      const visa = await this.visaRepository.findById(visa_id);
      if (visa) {
        jobProfile.visa = visa;
      }
    }

    // Handle country relation
    if (country) {
      const countryEntity = await this.countryRepository.findCountryById(country);
      if (countryEntity) {
        jobProfile.country = countryEntity;
      }
    }

    if (city) {
      const cityEntity = await this.cityRepository.findCityById(city);
      if (cityEntity) {
        jobProfile.city = cityEntity;
      }
    }

    const savedProfile = await this.userJobRepository.saveProfile(jobProfile);

    if (languages && languages.length > 0) {
      const languageEntities = await this.languageRepository.findByIds(languages);

      languageEntities.forEach((lang) => {
        lang.user = savedProfile;
      });

      if (languageEntities.length > 0) {
        await this.languageRepository.save(languageEntities);
      }
    }

    const updatedProfile = await this.userJobRepository.findById(savedProfile.id);
    if (!updatedProfile) {
      throw new NotFoundException(`Job profile with ID ${savedProfile.id} not found after saving`);
    }
    return updatedProfile;
  }

  async findByUserId(userId: number): Promise<FormattedJobProfile> {
    const profile = await this.userJobRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException(`Job profile for user with ID ${userId} not found`);
    }
    return this.formatJobProfile(profile);
  }

  async uploadProfileImage(userId: number, imageUrl: string): Promise<FormattedJobProfile> {
    const profile = await this.userJobRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException(`Job profile for user with ID ${userId} not found`);
    }
    profile.image = imageUrl;
    const updatedProfile = await this.userJobRepository.saveProfile(profile);

    return this.formatJobProfile(updatedProfile);
  }

  

  private formatJobProfile(profile): FormattedJobProfile {
    const sections = [
      'qualification',
      'experience',
      'skills',
      'resume',
      'certificates',
      'portfolio',
      'references',
    ];
    const sectionsStatus = {
      qualification: false,
      experience: profile.experiences && profile.experiences.length > 0,
      skills: profile.skills && profile.skills.length > 0,
      resume: false,
      certificates: false,
      portfolio: profile.portfolios && profile.portfolios.length > 0,
      references: profile.references && profile.references.length > 0,
    };

    const completedSections = Object.values(sectionsStatus).filter(Boolean).length;
    const totalSections = sections.length;
    const remainingSections = totalSections - completedSections;
    const completionPercentage = Math.round((completedSections / totalSections) * 100);

    return {
      success: true,
      data: {
        id: profile.id,
        name: `${profile.user.first_name} ${profile.user.last_name}`,
        summary: profile.summary || '',
        image: profile.image,
        country: profile.country
          ? {
              id: profile.country.id,
              name: profile.country.name,
            }
          : null,
        city: profile.city
          ? {
              id: profile.city.id,
              name: profile.city.name,
            }
          : null,
        basic_info: {
          email: profile.user.email,
          phone_number: profile.user.phone || '+1 (555) 555-5555',
          visa_id: profile.visa
            ? {
                id: profile.visa.id,
                name: profile.visa.value,
              }
            : null,
          gender: profile.gender || '',
          nationality: {
            id: 1,
            name: 'Morocco',
          },
          dob: profile.dob || '',
          languages: profile.languages
            ? profile.languages.map((lang) => ({
                id: lang.id,
                value: lang.value,
              }))
            : [],
        },
        headline: profile.headline || '',
        join_type: profile.join_type,
        career_level: profile.career_level,
        desired_salary: parseFloat(profile.desired_salary) || 0,
        total_sections: totalSections,
        completed_sections: completedSections,
        remaining_sections: remainingSections,
        completion_percentage: completionPercentage,
        sections_status: sectionsStatus,
      },
    };
  }
}
