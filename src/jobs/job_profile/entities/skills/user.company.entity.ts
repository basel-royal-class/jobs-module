import { CompaniesEntity } from '../../../../core/entities/company.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSkill } from './user.skill.entity';

@Entity('user_skills_companies')
export class UserSkillCompanies {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompaniesEntity, { eager: true })
  companies: CompaniesEntity;

  @ManyToOne(() => UserSkill, { eager: true })
  userSkills: UserSkill;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
