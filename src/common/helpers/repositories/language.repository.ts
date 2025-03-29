import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
import { LanguageEntity } from '../../../core/entities/language.entity';

@Injectable()
export class LanguageRepository extends Repository<LanguageEntity> {
  constructor(private dataSource: DataSource) {
    super(LanguageEntity, dataSource.createEntityManager());
  }

  async findLanguageById(id: number): Promise<LanguageEntity> {
    const language = await this.findOne({
      where: { id },
    });

    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }

    return language;
  }

  async findAllLanguages(): Promise<LanguageEntity[]> {
    return await this.find();
  }

  async findLanguagesBySearchTerm(searchTerm: string): Promise<LanguageEntity[]> {
    try {
      return await this.find({
        where: {
          value: ILike(`%${searchTerm}%`),
        },
      });
    } catch (error) {
      throw new Error(`Error searching companies with term "${searchTerm}": ${error.message}`);
    }
  }

  async removeLanguages(languages: LanguageEntity[]): Promise<void> {
    if (languages && languages.length > 0) {
      const languageIds = languages.map(lang => lang.id);
      await this.delete(languageIds);
    }
  }
}
