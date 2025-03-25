import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNationalityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class NationalityResponseDto {
  success: boolean;
  data: NationalityDto[] | NationalityDto;
}

export class NationalityDto {
  id: number;
  name: string;
}