import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResumeDto } from '../dtos/create.resume.dto';
import { ResumesService } from '../services/resumes.service';

@Controller('resumes')
export class ResumesController {
    constructor(private readonly resumesService: ResumesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadResume(
        @UploadedFile() file: Express.Multer.File,
        @Body() createResumeDto: CreateResumeDto,
        @Req() req
    ) {
        const userId = 1;
        const dto: CreateResumeDto = { file };
        const resume = await this.resumesService.create(file, dto, userId);
        return { success: true, data: resume };
    }

    @Get()
    async getUserResumes(@Req() req) {
        const userId = req.user.id;
        return {
            success: true,
            data: await this.resumesService.getUserResumes(userId)
        };
    }

    @Delete(':id')
    // @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
    async deleteResume(@Param('id', ParseIntPipe) id: number) {
        const userId = 1; // From JWT Token
        return {
            success: await this.resumesService.delete(id, userId),
            data: "Resume Deleted Successfully"
        }
    }
}
