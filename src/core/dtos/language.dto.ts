import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  value: string;
}

export class LanguageResponseDto {
  success: boolean;
  data: LanguageDto[] | LanguageDto;
}

export class LanguageDto {
  id: number;
  value: string;
}