import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from 'class-validator';
// import { CityEntity } from '../../../core/entities/cities.entity';
// import { CompaniesEntity } from '../../../core/entities/company.entity';
// import { JobCategoryEntity } from '../../../core/entities/job-category.entity';
// import { IndustriesEntity } from '../../../core/entities/industries.entity';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  job_title: string;

  @IsNumber()
  @IsOptional()
  job_category?: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number; 

  @IsNumber()
  @IsNotEmpty()
  company: number;

  @IsNumber()
  @IsNotEmpty()
  country_id: number;

  @IsNumber()
  @IsNotEmpty()
  city_id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date?: string | null;

  @IsNumber()
  @IsNotEmpty()
  industry_id: number;

  @IsBoolean()
  @IsNotEmpty()
  current_experience: boolean;

  @IsString()
  @IsOptional()
  experiences_year?: string;
}

export interface IndustryDto {
  id: number;
  value?: string;
  name?: string;
}

export interface CountryDto {
  id: number;
  name: string;

}

export interface CityDto {
  id: number;
  name: string;

 
}

export interface JobCategoryDto {
  id: number;
  value: string;
  
}

export interface CompanyDto {
  id: number;
  name: string;

}


export interface CompanyExperience {
    id: number;
    type: string;
    current_experience: boolean;
    job_title: string;
    description: string;
    industry_id: IndustryDto;
    country_id: CountryDto;
    city_id: CityDto;
    job_category?: JobCategoryDto | null;
    experiences_year: string | number;
    start_date: string;
    end_date: string | null;
  }
  
  export interface CompanyWithExperiences {
    id: number;
    name: string;
    image: string;
    total_experience_years: string | number;
    experiences: CompanyExperience[];
  }
  
  export interface CompaniesResponseDto {
    success: boolean;
    data: CompanyWithExperiences[];
  }
  
