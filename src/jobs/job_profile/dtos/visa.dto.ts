import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsBoolean,
    IsArray,
  } from 'class-validator';
  
  export class VisaTypeDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    @IsString()
    @IsNotEmpty()
    value: string;
  }
  
  export class VisaResponseDto {
    success: boolean;
    data: VisaTypeDto[];
  }
  