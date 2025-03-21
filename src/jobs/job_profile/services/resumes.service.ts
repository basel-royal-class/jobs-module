import { Injectable } from '@nestjs/common';
import { WasabiService } from '../../../common/helpers/services/wasabi.service';
import { ResumesRepository } from '../repositories/resumes.repository';
import { CreateResumeDto } from '../dtos/create.resume.dto';
import { ResumeEntity } from '../entities/resume.entity';

@Injectable()
export class ResumesService {
    constructor(
        private readonly resumesRepository: ResumesRepository,
        private readonly cloudStorageService: WasabiService, // Assume this service handles file upload
    ) { }

    async create(file: Express.Multer.File, createResumeDto: CreateResumeDto, userId: number): Promise<ResumeEntity> {
        const fileUrl = await this.cloudStorageService.uploadFile(file, 'resumes');
        return await this.resumesRepository.create(
            createResumeDto, fileUrl,
            userId
        );
    }

    async delete(id: number, user_id: number): Promise<void> {
        await this.resumesRepository.delete(id, user_id);
    }

    async getUserResumes(userId: number): Promise<{}> {
        return await this.resumesRepository.getUserResumes(userId);
    }

}
