import { Module } from '@nestjs/common';
import { WasabiServiceHelper } from '../wasabi.service.helper';
import { WasabiController } from '../controllers/wasabi.controller';

@Module({
    controllers: [WasabiController],
    providers: [WasabiServiceHelper],
    exports: [WasabiServiceHelper],  // Make sure to export it
})
export class WasabiModule { }