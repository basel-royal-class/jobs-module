import { Module } from '@nestjs/common';
import { JobProfileModule } from './jobs/job_profile/job-profile.module';
import { DatabaseModule } from './core/database/database.module';
import { HelpersModule } from './common/helpers/helpers.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    HelpersModule,
    JobProfileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
