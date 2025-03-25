import { Experience } from 'src/jobs/job_profile/entities/experince.entity';
import { QualificationsEntity } from 'src/jobs/job_profile/entities/qualification.entity';
import { ResumeEntity } from 'src/jobs/job_profile/entities/resume.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  first_name: string;

  @Column({ length: 100, nullable: false })
  last_name: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  headline: string;

  @Column({ nullable: true })
  summary: string;


  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type: 'date' })
  dob: Date;

  @Column({ nullable: true })
  phone_number: string;


  @Column({ nullable : true })
  join_type: string;



  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];


  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  desired_salary: number;

}
