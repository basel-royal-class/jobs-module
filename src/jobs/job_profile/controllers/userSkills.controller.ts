import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Put,
  UseFilters,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserSkillDto, UserSkillsService } from '../services/userSkills.service';
import { CreateSkillDto } from '../dtos/skills.dto';
import { HttpExceptionFilter } from '../../../common/utils/http-exception.filter';

@Controller('user-skills')
@UseFilters(new HttpExceptionFilter())
export class UserSkillController {
  private readonly logger = new Logger(UserSkillController.name);
  constructor(private readonly userSkillsService: UserSkillsService) {}

  @Get()
  async findAllUserSkills() {
    try {
      return this.userSkillsService.findAllUserSkills();
    } catch (error) {
      this.logger.error(`Failed to fetch certifications: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch certifications');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUserSkill(@Body() createUserSkillDto: CreateUserSkillDto) {
    try {
      return this.userSkillsService.createUserSkill(createUserSkillDto);
    } catch (error) {
      this.logger.error(`Failed to create Skills: ${error.message}`, error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create Skills');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserSkillById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.userSkillsService.getUserSkillById(id);
    } catch (error) {
      this.logger.error(`Failed to fetch skill: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch certification');
    }
  }

  @Put(':id')
  async updateUserSkill(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSkillDto: CreateSkillDto,
  ) {
    const data = await this.userSkillsService.updateUserSkill(id, updateUserSkillDto);
    try {
      return {
        success: true,
        data,
      };
    } catch (error) {
      this.logger.error(`Failed to update skill: ${error.message}`, error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update skill');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserSkill(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userSkillsService.deleteUserSkill(id);
    } catch (error) {
      this.logger.error(`Failed to delete skill: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete skill');
    }
  }
}
