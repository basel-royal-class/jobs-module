// src/skills/repositories/skills.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, ILike } from 'typeorm';
import { SkillsEntity } from '../../../core/entities/skills.entity';

@Injectable()
export class SkillsRepository extends Repository<SkillsEntity> {
  constructor(private dataSource: DataSource) {
    super(SkillsEntity, dataSource.createEntityManager());
  }

  async findAllSkills(): Promise<SkillsEntity[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new Error(`Error fetching all skills: ${error.message}`);
    }
  }

  async findSkillsBySearchTerm(searchTerm: string): Promise<SkillsEntity[]> {
    try {
      return await this.find({
        where: {
          value: ILike(`%${searchTerm}%`),
        },
      });
    } catch (error) {
      throw new Error(`Error searching skills with term "${searchTerm}": ${error.message}`);
    }
  }

  async findSkillById(id: number): Promise<SkillsEntity | null> {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Error fetching skill with id ${id}: ${error.message}`);
    }
  }

  async createSkill(skillData: Partial<SkillsEntity>): Promise<SkillsEntity> {
    try {
      const newSkill = this.create(skillData);
      return await this.save(newSkill);
    } catch (error) {
      throw new Error(`Error creating skill: ${error.message}`);
    }
  }

  async updateSkill(id: number, skillData: Partial<SkillsEntity>): Promise<SkillsEntity | null> {
    try {
      await this.update(id, skillData);
      return this.findSkillById(id);
    } catch (error) {
      throw new Error(`Error updating skill with id ${id}: ${error.message}`);
    }
  }

  async deleteSkill(id: number): Promise<boolean> {
    try {
      const result = await this.delete(id);
      return result && result.affected ? result.affected > 0 : false;
    } catch (error) {
      throw new Error(`Error deleting skill with id ${id}: ${error.message}`);
    }
  }
}
