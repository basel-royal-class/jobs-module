import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResumeEntity } from 'src/jobs/job_profile/entities/resume.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Load .env globally
        }),
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => ({
        //         type: 'postgres',
        //         host: configService.get<string>('DB_HOST'),
        //         port: configService.get<number>('DB_PORT'),
        //         username: configService.get<string>('DB_USER'),
        //         password: configService.get<string>('DB_PASSWORD'),
        //         database: configService.get<string>('DB_NAME'),
        //         entities: [ResumeEntity],
        //         url: configService.get<string>('DATABASE_URL'),
        //         autoLoadEntities: true, // Automatically load entities
        //         synchronize: configService.get<boolean>('DB_SYNCHRONIZE') === true,
        //         ssl: configService.get<boolean>('DB_SSL') ? { rejectUnauthorized: false } : false, // Enable SSL if needed
        //     }),
        // }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<string>('DATABASE_URL'),
                autoLoadEntities: true,
                synchronize: false,  // Set to true only in development
                ssl: {
                    rejectUnauthorized: false, // Required for Render
                },
            }),
        }),

    ],
})
export class DatabaseModule { }

// DB_SYNCHRONIZE=true  # Set to false in production
// DB_SSL=false         # Set to true if using SSL connection