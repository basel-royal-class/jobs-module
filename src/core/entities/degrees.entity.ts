// degree.entity.ts
import { QualificationsEntity } from '../../jobs/job_profile/entities/qualification.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('degrees')
export class DegreesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 225, nullable: false })
    name: string;

    @Column({ name: 'created_at', length: 50, nullable: false })
    createdAt: string;

    @Column({ name: 'updated_at', length: 50, nullable: false })
    updatedAt: string;

    @OneToMany(() => QualificationsEntity, qualification => qualification.degree)
    qualifications: QualificationsEntity[];
}