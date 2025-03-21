import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SkillEntity } from "../entities/skills/skill.entity";
import { Repository } from "typeorm";

@Injectable()
export class SkillsRepository {
    constructor(
        @InjectRepository(SkillEntity)
        private readonly repository: Repository<SkillEntity>
    ) { }

}