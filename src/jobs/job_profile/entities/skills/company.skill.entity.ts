import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { CompanyEntity } from '../../../../core/entities/company.entity';

@Entity('company_skills')
export class CompanySkillEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: number;

    @ManyToOne(() => CompanyEntity)
    @JoinColumn({ name: 'company_id' })
    company: CompanyEntity;

    @Column()
    skillId: number;

    @ManyToOne(() => SkillEntity)
    @JoinColumn({ name: 'skill_id' })
    skill: SkillEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
