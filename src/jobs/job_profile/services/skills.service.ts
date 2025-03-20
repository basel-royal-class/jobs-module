import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from '../dtos/create.skill.dto';
import { UpdateSkillDto } from '../dtos/update-skill.dto';

@Injectable()
export class SkillsService {
  async create(createSkillDto: CreateSkillDto) {
    return 'This action adds a new skill';
  }

  async getUserSkills() {
    return `This action returns all skills`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  async delete(id: number) {
    return `This action removes a #${id} skill`;
  }
}
