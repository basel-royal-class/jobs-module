import { UserSkillCompanies } from '../../jobs/job_profile/entities/skills/user.company.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('companies')
export class CompaniesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserSkillCompanies, (userSkillsCompanies) => userSkillsCompanies.companies)
  skills: UserSkillCompanies[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
