import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { UserJobProfile } from './user-job-profile.entity';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;
  
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
  
    // One-to-One relation with UserJobProfile
    @OneToOne(() => UserJobProfile, (profile) => profile.user, { cascade: true })
    @JoinColumn() 
    jobProfile: UserJobProfile;
  }