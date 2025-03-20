import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateQualificationDto {
    @IsInt()
    school_id: number;

    @IsInt()
    degree_id: number;

    @IsOptional()
    @IsString()
    specialization: string;

    @IsDateString()
    start_date: string;

    @IsDateString()
    end_date: string;

    @IsInt()
    country_id: number;

    @IsInt()
    city_id: number;

}
