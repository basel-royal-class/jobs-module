import { ResumeEntity } from 'src/jobs/job_profile/entities/resume.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ type: 'boolean', default: false })
    email_verified_at: boolean;

    @Column()
    password: string;

    @Column({ type: 'boolean', default: false })
    remember_token: boolean;

    @Column({ type: 'date', nullable: true })
    last_login_at: Date;

    @Column({ length: 250, nullable: true })
    image: string;

    @Column({ length: 50, nullable: true })
    whatsapp_number: string;

    @Column({ length: 50, nullable: true })
    phone_number: string;

    @OneToMany(() => ResumeEntity, (resume) => resume.user)
    resumes: ResumeEntity[];

    // @Column({ length: 25 })
    // role: string;

    // @Column({ length: 25 })
    // user_module: string;

    // @Column({ length: 50 })
    // user_country_code: string;

    // @Column({ length: 10 })
    // gender: string;

    //   @ManyToOne(() => Nationality, (nationality) => nationality.users, { nullable: true })
    //   nationality: Nationality;

    //   @ManyToOne(() => Company, (company) => company.users, { nullable: false })
    //   company: Company;

    @Column({ type: 'date', nullable: true })
    dob: Date;
}
