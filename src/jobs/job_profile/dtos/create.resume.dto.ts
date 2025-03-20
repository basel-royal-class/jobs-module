import { IsNotEmpty } from 'class-validator';

export class CreateResumeDto {
    @IsNotEmpty()
    file: Express.Multer.File;
}
