// src/skills/controllers/skills.controller.ts
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { SkillsService } from '../services/skills.service';
import { SkillsEntity } from 'src/core/entities/skills.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAllSkills() {
    try {
      const skills = await this.skillsService.findAllSkills();
      return {
        success: true,
        data: skills,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('search')
  async findSkillsBySearchTerm(@Query('term') searchTerm: string) {
    try {
      const skills = await this.skillsService.findSkillsBySearchTerm(searchTerm);
      return {
        success: true,
        data: skills,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post()
  async createSkill(@Body() skillData: Partial<SkillsEntity>) {
    try {
      const newSkill = await this.skillsService.createSkill(skillData);
      return {
        success: true,
        data: newSkill,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Put(':id')
  async updateSkill(@Param('id') id: number, @Body() skillData: Partial<SkillsEntity>) {
    try {
      const updatedSkill = await this.skillsService.updateSkill(id, skillData);
      if (!updatedSkill) {
        return {
          success: false,
          message: `Skill with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: updatedSkill,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findSkillById(@Param('id') id: number) {
    try {
      const skill = await this.skillsService.findSkillById(id);
      if (!skill) {
        return {
          success: false,
          message: `Skill with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: skill,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteSkill(@Param('id') id: number) {
    try {
      const deleted = await this.skillsService.deleteSkill(id);
      if (!deleted) {
        return {
          success: false,
          message: `Skill with id ${id} not found or could not be deleted`,
        };
      }
      return {
        success: true,
        message: `Skill with id ${id} successfully deleted`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
