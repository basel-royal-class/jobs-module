import { CompaniesEntity } from 'src/core/entities/company.entity';
import { SchoolsEntity } from 'src/core/entities/schools.entity';
import { SkillsEntity } from 'src/core/entities/skills.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSkillCompanies } from './user.company.entity';
import { UserSkillSchools } from './user.schools.entity';

@Entity('user_skills')
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SkillsEntity, { eager: true })
  skils: SkillsEntity;

  @OneToMany(() => UserSkillCompanies, (userSkillsCompanies) => userSkillsCompanies.userSkills)
  skillsCompanies: UserSkillCompanies[];

  @OneToMany(() => UserSkillSchools, (userSkillsSchool) => userSkillsSchool.userSkills)
  skillsSkills: UserSkillSchools[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
