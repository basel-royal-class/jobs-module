import { CityEntity } from "../entities/cities.entity";

export class CitysResponseDto {
    success: boolean;
    data: CityEntity[];
    message?: string;
  }
  
  export class CityResponseDto {
    success: boolean;
    data: CityEntity;
    message?: string;
  }
  