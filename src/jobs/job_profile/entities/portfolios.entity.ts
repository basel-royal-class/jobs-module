import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_portfolios')
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => UserJobProfile, (userJobProfile) => userJobProfile.portfolios)
  @JoinColumn({ name: 'user_job_profile_id' })
  userJobProfile: UserJobProfile;

  @Column({ name: 'user_job_profile_id' })
  userJobProfileId: number;

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;
}
