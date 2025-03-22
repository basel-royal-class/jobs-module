import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { SchoolsEntity } from '../../../../core/entities/schools.entity';

@Entity('school_skills')
export class SchoolSkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schoolId: number;

  @Column()
  skillId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => SchoolsEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolsEntity;

  @ManyToOne(() => SkillEntity)
  @JoinColumn({ name: 'skill_id' })
  skill: SkillEntity;
}
