import { Controller, Get, Query } from '@nestjs/common';
import { MapboxServiceHelper } from '../mapbox.service.helper';

@Controller('mapbox')
export class MapboxController {
    constructor(private readonly mapboxService: MapboxServiceHelper) { }

    @Get('geocode')
    async getGeocode(@Query('query') query: string) {
        return this.mapboxService.getGeocodingResults(query);
    }
}