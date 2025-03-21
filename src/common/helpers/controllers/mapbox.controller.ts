import { Controller, Get, Query } from '@nestjs/common';
import { MapboxService } from '../services/mapbox.service';

@Controller('mapbox')
export class MapboxController {
    constructor(private readonly mapboxService: MapboxService) { }

    @Get('geocode')
    async getGeocode(@Query('query') query: string) {
        return this.mapboxService.getGeocodingResults(query);
    }
}