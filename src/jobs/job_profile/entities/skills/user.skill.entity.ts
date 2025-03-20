import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { Users } from '../../../../core/entities/users.entity';

@Entity('user_skills')
export class UsersSkillsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @Column()
    skillId: number;

    @ManyToOne(() => SkillEntity)
    @JoinColumn({ name: 'skill_id' })
    skill: SkillEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
