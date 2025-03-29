import { Injectable } from '@nestjs/common';
import { LanguageRepository } from '../repositories/language.repository';
import { LanguageEntity } from '../../../core/entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(private readonly languagesRepository: LanguageRepository) {}

  async findAllLanguages(): Promise<LanguageEntity[]> {
    return this.languagesRepository.findAllLanguages();
  }

  async findLanguagesBySearchTerm(searchTerm: string): Promise<LanguageEntity[]> {
    return this.languagesRepository.findLanguagesBySearchTerm(searchTerm);
  }

  async findLanguagesById(id: number): Promise<LanguageEntity | null> {
    return this.languagesRepository.findLanguageById(id);
  }
}