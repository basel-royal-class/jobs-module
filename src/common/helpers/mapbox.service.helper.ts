import { Injectable } from '@nestjs/common';
import * as MapboxSdk from '@mapbox/mapbox-sdk';
import axios from 'axios';

@Injectable()
export class MapboxServiceHelper {
    private mapboxClient;

    constructor() {
        const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
        this.mapboxClient = MapboxSdk({ accessToken });
    }

    async getGeocodingResults(query: string) {
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${'pk.eyJ1IjoibW90YXNpbWNsYXNzIiwiYSI6ImNtMms4bTZoaTA3cDEya3NlYTlxanVibzQifQ.xMXTeFGdUKapYpJq6zMYAw'}&limit=5`;

            const response = await axios.get(url);

            if (!response.data || !response.data.features) {
                throw new Error('Invalid response from Mapbox');
            }

            return response.data.features; // Return the places found
        } catch (error) {
            console.error('Error fetching geocoding results:', error.message);
            throw new Error('Failed to fetch geocoding data');
        }


        // try {
        //     const response = await this.mapboxClient.geocoding.forwardGeocode({
        //         query,
        //         limit: 5,
        //     }).send();
        //     return response.body;
        // } catch (error) {
        //     throw new Error('Error fetching geocoding resultss');
        // }
    }

}


