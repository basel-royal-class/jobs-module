import { Injectable } from '@nestjs/common';
import { UserSkillsRepository } from '../repositories/userSkills.repository';

export interface CreateUserSkillDto {
  skill_id: number;
  companies: number[];
  schools: number[];
}

@Injectable()
export class UserSkillsService {
  constructor(
    private readonly userSkillsRepository: UserSkillsRepository,
  ) {}

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
}