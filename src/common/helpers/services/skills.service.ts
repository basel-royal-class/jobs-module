import { ConflictException, Injectable } from '@nestjs/common';
import { SkillsRepository } from '../repositories/skills.repository';
import { SkillsEntity } from '../../../core/entities/skills.entity';

@Injectable()
export class SkillsService {
  constructor(private readonly skillsRepository: SkillsRepository) {}

  async findAllSkills(): Promise<SkillsEntity[]> {
    return this.skillsRepository.findAllSkills();
  }

  async findSkillsBySearchTerm(searchTerm: string): Promise<SkillsEntity[]> {
    return this.skillsRepository.findSkillsBySearchTerm(searchTerm);
  }

  async findSkillById(id: number): Promise<SkillsEntity | null> {
    return this.skillsRepository.findSkillById(id);
  }

  async createSkill(skillData: Partial<SkillsEntity>): Promise<SkillsEntity> {
    if (skillData.value) {
      const valueToCheck = skillData.value;
      const existingSkills = await this.skillsRepository.findSkillsBySearchTerm(valueToCheck);

      const duplicate = existingSkills.find(
        (skill) => skill.value.toLowerCase() === valueToCheck.toLowerCase(),
      );

      if (duplicate) {
        throw new ConflictException(`Skill with value "${skillData.value}" already exists`);
      }
    }

    return this.skillsRepository.createSkill(skillData);
  }

  async updateSkill(id: number, skillData: Partial<SkillsEntity>): Promise<SkillsEntity | null> {
    // Check for duplicate value when updating
    if (skillData.value) {
      const valueToCheck = skillData.value;
      const existingSkills = await this.skillsRepository.findSkillsBySearchTerm(valueToCheck);

      const duplicate = existingSkills.find(
        (skill) => skill.value.toLowerCase() === valueToCheck.toLowerCase() && skill.id !== id,
      );

      if (duplicate) {
        throw new ConflictException(`Skill with value "${valueToCheck}" already exists`);
      }
    }

    return this.skillsRepository.updateSkill(id, skillData);
  }

  async deleteSkill(id: number): Promise<boolean> {
    return this.skillsRepository.deleteSkill(id);
  }
}
