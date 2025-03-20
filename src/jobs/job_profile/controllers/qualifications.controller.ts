import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { QualificationsService } from '../services/qualifications.service';
import { CreateQualificationDto } from '../dtos/create.qualification.dto';
import { UpdateQualificationDto } from '../dtos/update.qualification.dto';

@Controller('qualifications')
export class QualificationsController {
    constructor(private readonly qualificationsService: QualificationsService) { }

    @Post()
    async createQualification(
        @Req() req,
        @Body() createQualificationDto: CreateQualificationDto
    ) {
        // const userId = req.user.id;
        const userId = 1; // From JWT Token
        return {
            succes: true,
            data: await this.qualificationsService.create(userId, createQualificationDto)
        };
    }

    @Get()
    async getUserQualifications(@Req() req) {
        // const userId = req.user.id;
        const userId = 1; // From JWT Token

        return {
            succes: true,
            data: await this.qualificationsService.getUserQualifications(userId)
        };
    }

    @Put(':id')
    async updateQualification(
        @Param('id', ParseIntPipe) id: number,
        @Req() req,
        @Body() updateQualificationDto: UpdateQualificationDto
    ) {
        // const userId = req.user.id;
        const userId = 1; // From JWT Token
        return {
            success: true,
            data: await this.qualificationsService.update(id, userId, updateQualificationDto)
        };
    }

    @Delete(':id')
    async deleteQualification(
        @Param('id', ParseIntPipe) id: number,
        @Req() req
    ) {
        // const userId = req.user.id;
        const userId = 1; // From JWT Token
        return {
            success: true,
            message: "Qualification Deleted Successfully"
        }
    }
}
