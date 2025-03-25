import {IsNotEmpty , IsString , IsNumber} from 'class-validator' ;

export class CreateCertificationDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  
    @IsString()
    @IsNotEmpty()
    course_name: string;
  
    @IsString()
    @IsNotEmpty()
    issuing_organization: string;
  }