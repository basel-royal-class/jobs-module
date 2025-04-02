import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IndustriesEntity } from '../../../core/entities/industries.entity';
import { CountryEntity } from '../../../core/entities/countries.entity';
import { CityEntity } from '../../../core/entities/cities.entity';
import { JobCategoryEntity } from '../../../core/entities/job-category.entity';
import { CompaniesEntity } from '../../../core/entities/company.entity';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  current_experience: boolean;

  @Column()
  job_title: string;

  @Column()
  description: string;

  @ManyToOne(() => IndustriesEntity)
  industry: IndustriesEntity;

  @ManyToOne(() => CountryEntity)
  country: CountryEntity;

  @ManyToOne(() => CityEntity)
  city: CityEntity;

  @ManyToOne(() => JobCategoryEntity)
  job_category: JobCategoryEntity;

  @Column()
  experiences_year: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date | null;

  @ManyToOne(() => CompaniesEntity)
  company: CompaniesEntity;

  @ManyToOne(() => UserJobProfile)
  user: UserJobProfile;
}
