import { Repository } from "typeorm";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResumeEntity } from "../entities/resume.entity";
import { CreateResumeDto } from "../dtos/create.resume.dto";

@Injectable()
export class ResumesRepository {
    constructor(
        @InjectRepository(ResumeEntity)
        private readonly resumeRepository: Repository<ResumeEntity>
    ) { }

    async create(dto: CreateResumeDto, link: string, user_id: number): Promise<ResumeEntity> {
        const { file } = dto;
        const file_name = file.originalname;
        const resume = this.resumeRepository.create({ link, file_name, user_id });
        return await this.resumeRepository.save(resume);
    }

    async delete(id: number, user_id: number): Promise<void> {
        const resume = await this.resumeRepository.findOne({ where: { id } });

        if (!resume) {
            throw new NotFoundException(`Resume with ID ${id} not found`);
        }

        if (resume.user_id !== user_id) {
            throw new ForbiddenException(`You do not have permission to delete this resume`);
        }

        await this.resumeRepository.delete(id);
    }

    async getUserResumes(userId: number): Promise<{}> {
        return await this.resumeRepository.find({ where: { user_id: userId } });
    }

}
