import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateUserSkillDto,
  UserSkillsService,
} from '../services/userSkills.service';
import { CreateSkillDto } from '../dtos/skills.dto';

@Controller('user-skills')
export class UserSkillController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  //   @Post()
  //   @HttpCode(HttpStatus.CREATED)
  //   create(@Body() createUserSkillDto: CreateSkillDto) {
  //     return this.userSkillService.create(createUserSkillDto);
  //   }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUserSkill(@Body() createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillsService.createUserSkill(createUserSkillDto);
  }
}
