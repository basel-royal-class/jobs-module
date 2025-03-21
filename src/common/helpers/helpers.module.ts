import { Module } from "@nestjs/common";
import { MapboxController } from "./controllers/mapbox.controller";
import { WasabiService } from "./services/wasabi.service";
import { MapboxService } from "./services/mapbox.service";
import { WasabiController } from "./controllers/wasabi.controller";
import { SearchController } from "./controllers/search.controller";
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
        WasabiService,
        MapboxService,
        SearchService
    ],
})
export class HelpersModule { }