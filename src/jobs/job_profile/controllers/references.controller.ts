import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ReferenceService } from '../services/references.service';
  import { CreateReferenceDto } from '../dtos/references.dto';
  
  @Controller('references')
  export class ReferenceController {
    constructor(private readonly referenceService: ReferenceService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReferenceDto: CreateReferenceDto) {
      const data = await this.referenceService.create(createReferenceDto);
      return {
        success: true,
        data
      };
    }
  
    @Get()
    async findAll() {
      const data = await this.referenceService.findAll();
      return {
        success: true,
        data
      };
    }
  
    @Get(':id')
    async findById(@Param('id') id: number) {
      const data = await this.referenceService.findById(id);
      return {
        success: true,
        data
      };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: number) {
      await this.referenceService.delete(id);
      return {
        success: true,
        message: 'Reference deleted successfully',
        data: null
      };
    }
  }