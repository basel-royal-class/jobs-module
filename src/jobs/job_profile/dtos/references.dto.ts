import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MaxLength,
    MinLength,
    IsNumber,
  } from 'class-validator';
  
  export class CreateReferenceDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  
    @MinLength(2)
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsString()
    @MaxLength(50)
    @MinLength(2)
    @IsNotEmpty()
    company_name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
  
  export class ReferenceResponseDto {
    id: number;
    user_id: number;
    name: string;
    company_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
  }
  