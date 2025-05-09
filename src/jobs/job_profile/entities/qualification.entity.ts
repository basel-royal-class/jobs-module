import { CityEntity } from '../../../core/entities/cities.entity';
import { CountryEntity } from '../../../core/entities/countries.entity';
import { DegreesEntity } from '../../../core/entities/degrees.entity';
import { SchoolsEntity } from '../../../core/entities/schools.entity';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('qualifications')
export class QualificationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: false })
  user_id: number;

  @Column({ name: 'school_id', nullable: false })
  school_id: number;

  @Column({ name: 'degree_id', nullable: false })
  degree_id: number;

  @Column({ length: 25, nullable: false })
  specialization: string;

  @Column({ name: 'start_date', length: 50, nullable: false })
  start_date: string;

  @Column({ name: 'end_date', length: 50, nullable: false })
  end_date: string;

  @Column({ name: 'country_id', nullable: false })
  country_id: number;

  @Column({ name: 'city_id', nullable: false })
  city_id: number;

  @ManyToOne(() => CountryEntity)
  country: CountryEntity;

  @ManyToOne(() => CityEntity)
  city: CityEntity;

  @ManyToOne(() => DegreesEntity)
  degree: DegreesEntity;

  @ManyToOne(() => SchoolsEntity)
  school: SchoolsEntity;

  @ManyToOne(() => UserJobProfile)
  userJob: UserJobProfile;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;
}
