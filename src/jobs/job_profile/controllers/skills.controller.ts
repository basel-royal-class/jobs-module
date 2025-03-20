import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateSkillDto } from '../dtos/create.skill.dto';
import { SkillsService } from '../services/skills.service';
import { UpdateSkillDto } from '../dtos/update-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  async getUserSkills() {
    return this.skillsService.getUserSkills();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.skillsService.delete(+id);
  }
}
