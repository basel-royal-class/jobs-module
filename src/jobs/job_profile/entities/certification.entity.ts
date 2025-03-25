import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user_job_certificates')
@Unique('UQ_certification_course_name', ['course_name'])
export class CertificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  course_name: string;

  @Column()
  issuing_organization: string;

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;
}