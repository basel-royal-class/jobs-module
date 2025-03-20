import { Module } from '@nestjs/common';
import { JobProfileModule } from './jobs/job_profile/job-profile.module';
import { DatabaseModule } from './core/database/database.module';
import { HelpersModule } from './common/helpers/helpers.module';

@Module({
  imports: [DatabaseModule, HelpersModule, JobProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
