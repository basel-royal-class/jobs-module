import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WasabiService } from '../services/wasabi.service';

@Controller('upload')
export class WasabiController {
    constructor(private readonly wasabiService: WasabiService) { }

    @Post('wasabi')
    @UseInterceptors(FileInterceptor('file'))
    async uploadToWasabi(@UploadedFile() file: Express.Multer.File) {
        const fileUrl = await this.wasabiService.uploadFile(file, null);
        return { message: 'File uploaded successfully', fileUrl };
    }
}