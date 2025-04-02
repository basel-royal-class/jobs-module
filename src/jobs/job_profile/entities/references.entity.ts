import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import { Column, Entity , ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_job_references')
export class ReferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  company_name: string;

  @Column()
  email: string;

  @ManyToOne(() => UserJobProfile, (userJobProfile) => userJobProfile.references)
  userJobProfile: UserJobProfile;

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;
}
