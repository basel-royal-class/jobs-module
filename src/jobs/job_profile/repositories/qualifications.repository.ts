import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { QualificationsEntity } from "../entities/qualification.entity";
import { CreateQualificationDto } from "../dtos/create.qualification.dto";
import { UpdateQualificationDto } from "../dtos/update.qualification.dto";

@Injectable()
export class QualificationsRepository {
    constructor(
        @InjectRepository(QualificationsEntity)
        private readonly qualificationsRepository: Repository<QualificationsEntity>
    ) { }

    async create(user_id: number, createDto: CreateQualificationDto): Promise<QualificationsEntity> {
        const qualification = this.qualificationsRepository.create({ user_id, ...createDto });
        return await this.qualificationsRepository.save(qualification);
    }

    async getUserQualifications(user_id: number): Promise<QualificationsEntity[]> {
        return await this.qualificationsRepository.find({
            where: { user_id: user_id },
            relations: ['degree', 'school', 'country', 'city']
        });
    }

    async update(id: number, user_id: number, updateDto: UpdateQualificationDto): Promise<QualificationsEntity> {
        const qualification = await this.qualificationsRepository.findOne({ where: { id: id } });

        if (!qualification) {
            throw new NotFoundException(`Qualification with ID ${id} not found`);
        }

        if (qualification.user_id !== user_id) {
            throw new ForbiddenException(`You are not allowed to update this qualification`);
        }

        Object.assign(qualification, updateDto);
        await this.qualificationsRepository.save(qualification);
        const updatedQualification = await this.qualificationsRepository.findOne({
            where: { id: qualification.id },
            relations: ['degree', 'school', 'country', 'city'],
        });

        if (updatedQualification) return updatedQualification;
        else throw new NotFoundException(`Qualification with ID ${id} not found`);
    }

    async delete(id: number, user_id: number): Promise<void> {
        const qualification = await this.qualificationsRepository.findOne({ where: { id } });

        if (!qualification) {
            throw new NotFoundException(`Qualification with ID ${id} not found`);
        }

        if (qualification.user_id !== user_id) {
            throw new ForbiddenException(`You are not allowed to delete this qualification`);
        }

        await this.qualificationsRepository.delete(id);
    }
}
