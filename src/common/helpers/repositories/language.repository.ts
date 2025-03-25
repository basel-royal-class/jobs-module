import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Language } from '../../../core/entities/language.entity';

@Injectable()
export class LanguageRepository extends Repository<Language> {
  constructor(private dataSource: DataSource) {
    super(Language, dataSource.createEntityManager());
  }

  async createLanguage(value: string): Promise<Language> {
    const language = this.create({ value });
    return await this.save(language);
  }

  async findLanguageById(id: number): Promise<Language> {
    const language = await this.findOne({
      where: { id },
    });

    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }

    return language;
  }

  async findAllLanguages(): Promise<Language[]> {
    return await this.find();
  }
}
