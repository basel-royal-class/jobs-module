import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WasabiServiceHelper {
    private s3Client: S3Client;
    private bucketName: string;

    constructor(private configService: ConfigService) {
        this.s3Client = new S3Client({
            region: this.configService.get<string>('WAS_DEFAULT_REGION')!,
            endpoint: this.configService.get<string>('WAS_URL')!,
            credentials: {
                accessKeyId: this.configService.get<string>('WAS_ACCESS_KEY_ID')!,
                secretAccessKey: this.configService.get<string>('WAS_SECRET_ACCESS_KEY')!,
            },
        });

        this.bucketName = this.configService.get<string>('WAS_BUCKET')!;
    }

    async uploadFile(file: Express.Multer.File, folder: string | null): Promise<string> {
        var fileKey = '';
        if (folder) {
            fileKey = `${folder}/${Date.now()}-${file.originalname}`;
        } else {
            fileKey = `nestjs-uploads/${Date.now()}-${file.originalname}`;
        }

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        return `https://${this.bucketName}.s3.wasabisys.com/${fileKey}`;
    }
}
