import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { CompanyEntity } from '../../../../core/entities/company.entity';

@Entity('company_skills')
export class CompanySkillEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: number;

    @Column()
    skillId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CompanyEntity)
    @JoinColumn({ name: 'company_id' })
    company: CompanyEntity;

    @ManyToOne(() => SkillEntity)
    @JoinColumn({ name: 'skill_id' })
    skill: SkillEntity;
}
