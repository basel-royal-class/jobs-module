// src/jobs/job-profile/services/job-profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobProfileDto } from '../../../core/dtos/user-job-profile.dto';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import { UserJobRepository } from '../repositories/user-job.repository';
import { CountriesRepository } from '../repositories/country.repository';
import { CitiesRepository } from '../repositories/city.repository';
import { LanguageRepository } from '../repositories/language.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../core/entities/user.entity';
import { Repository } from 'typeorm';
import { VisaTypeRepository } from 'src/jobs/job_profile/repositories/visa.repository';
import { UserRepository } from '../repositories/user.repository';

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

  async findById(profileId: number): Promise<UserJobProfile> {
    const profile = await this.userJobRepository.findById(profileId);
    if (!profile) {
      throw new NotFoundException(`Job profile with ID ${profileId} not found`);
    }
    return profile;
  }

  async findByUserId(userId: number): Promise<UserJobProfile> {
    const profile = await this.userJobRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException(`Job profile for user with ID ${userId} not found`);
    }
    return profile;
  }

  async createOrUpdateJobProfile(createJobProfileDto: CreateJobProfileDto): Promise<UserJobProfile> {
    const { user_id, visa_id, country, city, languages, ...profileData } = createJobProfileDto;
    
    // Find the user with job profile relation
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: ['jobProfile'],
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    
    let jobProfile: UserJobProfile;
    
    if (user.jobProfile) {
      // Update existing profile
      jobProfile = user.jobProfile;
      Object.assign(jobProfile, profileData);
    } else {
      // Create new profile
      jobProfile = new UserJobProfile();
      Object.assign(jobProfile, profileData);
      jobProfile.user = user;
    }
    
    // Handle visa relation
    if (visa_id) {
      const visa = await this.visaRepository.findById(visa_id);
      if (visa) {
      console.log(visa)

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
    
    // Handle city relation
    if (city) {
      const cityEntity = await this.cityRepository.findCityById(city);
      if (cityEntity) {
        jobProfile.city = cityEntity;
      }
    }
    
    // Save the profile 
    const savedProfile = await this.userJobRepository.saveProfile(jobProfile);
    
    // Handle languages if provided
    if (languages && languages.length > 0) {
      // Find and associate new languages
      const languageEntities = await this.languageRepository.findByIds(languages);
      
      // Set the user job profile relation for each language
      languageEntities.forEach(lang => {
        lang.user = savedProfile;
      });
      
      // Save the languages
      if (languageEntities.length > 0) {
        await this.languageRepository.save(languageEntities);
      }
    }
    
    // Return the updated job profile with all relations including experiences
    const updatedProfile = await this.userJobRepository.findById(savedProfile.id);
    if (!updatedProfile) {
      throw new NotFoundException(`Job profile with ID ${savedProfile.id} not found after saving`);
    }
    return updatedProfile;
  }
}