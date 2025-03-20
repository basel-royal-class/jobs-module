import { Module } from "@nestjs/common";
import { MapboxController } from "./controllers/mapbox.controller";
import { WasabiServiceHelper } from "./wasabi.service.helper";
import { MapboxServiceHelper } from "./mapbox.service.helper";
import { WasabiController } from "./controllers/wasabi.controller";
import { SearchController } from "./controllers/search.controller";
import { SearchRepository } from "./repositories/search.repository";
import { SearchService } from "./services/search.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DegreesEntity } from "../../core/entities/degrees.entity";
import { SchoolsEntity } from "../../core/entities/schools.entity";
import { SkillEntity } from "../../jobs/job_profile/entities/skills/skill.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DegreesEntity, SchoolsEntity, SkillEntity])],
    controllers: [
        MapboxController,
        WasabiController,
        SearchController
    ],
    providers: [
        WasabiServiceHelper,
        MapboxServiceHelper,
        SearchRepository,
        SearchService
    ],
})
export class HelpersModule { }