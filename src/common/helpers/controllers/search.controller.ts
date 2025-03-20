import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "../services/search.service";

@Controller()
export class SearchController {
    constructor(private readonly service: SearchService) { }

    @Get('get_degrees')
    async degreesSearch(@Query('query') name: string) {
        return {
            success: true,
            data: await this.service.degreesSearch(name)
        };
    }

    @Get('get_schools')
    async schoolsSearch(@Query('query') name: string) {
        return {
            success: true,
            data: await this.service.schoolsSearch(name)
        };
    }

    // @Get('get_skills')
    // async skillsSearch(@Query('query') name: string): Promise<SkillEntity[]> {
    //     return this.service.skillsSearch(name);
    // }
}
