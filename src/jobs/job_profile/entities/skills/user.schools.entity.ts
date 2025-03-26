import { SchoolsEntity } from '../../../../core/entities/schools.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSkill } from './user.skill.entity';

@Entity('user_skills_schools')
export class UserSkillSchools {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolsEntity, { eager: true })
  schools: SchoolsEntity;

  @ManyToOne(() => UserSkill, { eager: true })
  userSkills: UserSkill;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
