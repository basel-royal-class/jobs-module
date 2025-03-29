import { expression } from './../../../node_modules/@types/babel__template/index.d';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResumeEntity } from 'src/jobs/job_profile/entities/resume.entity';
import { QualificationsEntity } from 'src/jobs/job_profile/entities/qualification.entity';
import { VisaTypeEntity } from '../../jobs/job_profile/entities/visa.entity';
import { ReferenceEntity } from '../../jobs/job_profile/entities/references.entity';

import { CompaniesEntity } from '../entities/company.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                url: 'postgresql://fynd_user:uQsduIiR0RQxaX2TpX9tuP9B2fTDErpO@dpg-cvei0n1c1ekc73efa6qg-a/fynd',
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV !== 'production',
                entities: [
                    QualificationsEntity,
                    ResumeEntity,
                    VisaTypeEntity,
                    ReferenceEntity,
                    CompaniesEntity,
                ]
            }),
        }),
    ],
})
export class DatabaseModule { }

// DB_SYNCHRONIZE=true  # Set to false in production
// DB_SSL=false         # Set to true if using SSL connection