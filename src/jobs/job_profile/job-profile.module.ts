import { Module } from '@nestjs/common';
import { ResumesModule } from './modules/resumes.module';
import { QualificationsModule } from './modules/qualifications.module';

@Module({
    imports: [
        QualificationsModule,
        ResumesModule,
    ],
})
export class JobProfileModule { }
