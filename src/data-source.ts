import { DataSource } from 'typeorm';
import { Users } from './core/entities/users.entity';
import { CityEntity } from './core/entities/cities.entity';
import { CountryEntity } from './core/entities/countries.entity';
import { SchoolsEntity } from './core/entities/schools.entity';
import { DegreesEntity } from './core/entities/degrees.entity';
import { ResumeEntity } from './jobs/job_profile/entities/resume.entity';
import { QualificationsEntity } from './jobs/job_profile/entities/qualification.entity';
import { SkillEntity } from './jobs/job_profile/entities/skills/skill.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',  // Change to 'mysql' if using MySQL
    url: process.env.DATABASE_URL,
    entities: [
        Users,
        CityEntity,
        CountryEntity,
        SchoolsEntity,
        DegreesEntity,
        ResumeEntity,
        QualificationsEntity,
        SkillEntity],  // Add all your entities
    migrations: ['dist/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
