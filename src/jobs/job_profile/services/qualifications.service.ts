import { Injectable } from '@nestjs/common';
import { QualificationsRepository } from '../repositories/qualifications.repository';
import { CreateQualificationDto } from '../dtos/create.qualification.dto';
import { QualificationsEntity } from '../entities/qualification.entity';
import { UpdateQualificationDto } from '../dtos/update.qualification.dto';

@Injectable()
export class QualificationsService {
    constructor(
        private readonly respository: QualificationsRepository,
    ) { }

    async create(userId: number, createQualificationDto: CreateQualificationDto): Promise<QualificationsEntity> {
        return await this.respository.create(userId, createQualificationDto);
    }

    async update(id: number, user_id: number, updateDto: UpdateQualificationDto) {
        return await this.respository.update(id, user_id, updateDto);
    }

    async delete(id: number, user_id: number): Promise<void> {
        await this.respository.delete(id, user_id);
    }

    async getUserQualifications(userId: number): Promise<{}> {
        return await this.respository.getUserQualifications(userId);
    }
}
