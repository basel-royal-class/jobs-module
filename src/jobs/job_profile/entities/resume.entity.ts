import { Users } from 'src/core/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resumes')
export class ResumeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column()
    file_name: string;

    @Column()
    created_at: Date;

    @Column({ type: 'int' })
    user_id: number;

    @ManyToOne(() => Users, (user) => user.resumes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Users;
}
