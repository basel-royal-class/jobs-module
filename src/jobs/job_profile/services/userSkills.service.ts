import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSkillsRepository } from '../repositories/userSkills.repository';
import { UserSkill } from '../entities/skills/user.skill.entity';

export interface CreateUserSkillDto {
  skill_id: number;
  companies: number[];
  schools: number[];
}

@Injectable()
export class UserSkillsService {
  constructor(private readonly userSkillsRepository: UserSkillsRepository) {}

  /**
   * Find all user skills
   * @returns List of user skills
   */
  async findAllUserSkills() {
    return this.userSkillsRepository.findAllUserSkills();
  }

  async createUserSkill(createUserSkillDto: CreateUserSkillDto) {
    try {
      const { skill_id, companies, schools } = createUserSkillDto;

      const result = await this.userSkillsRepository.createUserSkill(
        skill_id,
        companies || [],
        schools || [],
      );

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getUserSkillById(id: number) {
    try {
      const userSkill = await this.userSkillsRepository.findUserSkillById(id);

      if (!userSkill) {
        return {
          success: false,
          message: 'User skill not found',
        };
      }

      return {
        success: true,
        data: userSkill,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Update an existing user skill and its associations
   * @param id User skill ID
   * @param updateUserSkillDto DTO with fields to update
   * @returns Updated user skill
   */
  async updateUserSkill(id: number, updateUserSkillDto: CreateUserSkillDto) {
    const userSkill = await this.userSkillsRepository.findUserSkillById(id);
    if (!userSkill) {
      throw new NotFoundException(`User skill with ID ${id} not found`);
    }

    const { skill_id, companies, schools } = updateUserSkillDto;

    return this.userSkillsRepository.updateUserSkill(id, skill_id, companies, schools);
  }

  /**
   * Delete a user skill
   * @param id User skill ID
   */
  async deleteUserSkill(id: number): Promise<void> {
    await this.userSkillsRepository.deleteUserSkill(id);
  }
}
