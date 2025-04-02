import { UserJobProfile } from '../../core/entities/user-job-profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('languages')
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => UserJobProfile)
  user: UserJobProfile;
}
