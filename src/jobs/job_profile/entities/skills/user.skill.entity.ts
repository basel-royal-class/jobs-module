import { SkillsEntity } from '../../../../core/entities/skills.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSkillCompanies } from './user.company.entity';
import { UserSkillSchools } from './user.schools.entity';
import { UserJobProfile } from '../../../../core/entities/user-job-profile.entity';

@Entity('user_skills')
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SkillsEntity, { eager: true })
  skils: SkillsEntity;

  // Add this relationship
  @ManyToOne(() => UserJobProfile, (userJobProfile) => userJobProfile.skills)
  userJobProfile: UserJobProfile;


  @OneToMany(() => UserSkillCompanies, (userSkillsCompanies) => userSkillsCompanies.userSkills)
  skillsCompanies: UserSkillCompanies[];

  @OneToMany(() => UserSkillSchools, (userSkillsSchool) => userSkillsSchool.userSkills)
  skillsSkills: UserSkillSchools[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
