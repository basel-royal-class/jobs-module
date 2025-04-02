import { Experience } from 'src/jobs/job_profile/entities/experince.entity';
import { QualificationsEntity } from 'src/jobs/job_profile/entities/qualification.entity';
import { ResumeEntity } from 'src/jobs/job_profile/entities/resume.entity';
import { VisaTypeEntity } from 'src/jobs/job_profile/entities/visa.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CountryEntity } from './countries.entity';
import { CityEntity } from './cities.entity';
import { LanguageEntity } from './language.entity';
import { User } from './user.entity';
import { SkillsEntity } from './skills.entity';
import { UserSkill } from 'src/jobs/job_profile/entities/skills/user.skill.entity';
import { PortfolioEntity } from 'src/jobs/job_profile/entities/portfolios.entity';

@Entity('user_job_profile')
export class UserJobProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type: 'date' })
  dob: Date;

  @Column({ nullable: true })
  career_level: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  desired_salary: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ nullable: true })
  join_type: string;

  @Column({ nullable: true })
  summary: string;

  // Change from OneToOne to ManyToOne for country
  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  // Change from OneToOne to ManyToOne for city
  @ManyToOne(() => CityEntity)
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;

  @Column({ nullable: true })
  headline: string;

  @ManyToOne(() => VisaTypeEntity)
  @JoinColumn({ name: 'visa_id' })
  visa: VisaTypeEntity;

  @OneToMany(() => LanguageEntity, (language) => language.user)
  languages: LanguageEntity[];

  @OneToOne(() => User, (user) => user.jobProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.userJobProfile)
  skills: UserSkill[];

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.userJobProfile)
  portfolios: PortfolioEntity[];
}
