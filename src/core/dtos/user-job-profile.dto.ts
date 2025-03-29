// src/core/dtos/user-job-profile.dto.ts
import { IsNumber, IsString, IsOptional, IsDate, IsArray, IsEnum, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

enum JoinType {
  IMMEDIATE = 'imm',
  ONE_MONTH = 'one_month',
  TWO_MONTHS = 'two_months',
  THREE_MONTHS = 'three_months'
}

enum CareerLevel {
  FRESH = 'fresh',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  MANAGER = 'manager'
}

export class CreateJobProfileDto {
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEnum(JoinType)
  join_type?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  desired_salary?: number;

  @IsOptional()
  @IsEnum(CareerLevel)
  career_level?: string;

  @IsOptional()
  @IsNumber()
  visa_id?: number;

  @IsOptional()
  @IsNumber()
  country?: number;

  @IsOptional()
  @IsNumber()
  city?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  languages?: number[];
}