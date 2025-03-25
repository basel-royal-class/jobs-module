import { CountryEntity } from '../entities/countries.entity';

export class CountriesResponseDto {
  success: boolean;
  data: CountryEntity[];
  message?: string;
}

export class CountryResponseDto {
  success: boolean;
  data: CountryEntity;
  message?: string;
}
