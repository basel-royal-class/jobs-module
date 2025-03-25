// import { BadRequestException, Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { SkillEntity } from "../entities/skills/skill.entity";
// import { DataSource, Repository } from "typeorm";
// import { CreateSkillDto } from "../dtos/create.skill.dto";
// import { UsersSkillsEntity } from "../entities/skills/user.skill.entity";
// import { CompanySkillEntity } from "../entities/skills/company.skill.entity";
// import { SchoolSkillEntity } from "../entities/skills/school.skill.entity";

// @Injectable()
// export class SkillsRepository {
//     // constructor(
//     //     @InjectRepository(SkillEntity)
//     //     private readonly repository: Repository<SkillEntity>,

//     // ) { }
//     constructor(
//         @InjectRepository(UsersSkillsEntity)
//         private readonly userSkillRepo: Repository<UsersSkillsEntity>,

//         @InjectRepository(CompanySkillEntity)
//         private readonly companySkillRepo: Repository<CompanySkillEntity>,

//         @InjectRepository(SchoolSkillEntity)
//         private readonly schoolSkillRepo: Repository<SchoolSkillEntity>,
//     ) { }


//     async create(dto: CreateSkillDto, userId: number) {
//         // Check if skill already exists
//         const exists = await this.userSkillRepo.findOne({
//             where: { userId, skillId: dto.skill_id },
//         });

//         if (exists) {
//             throw new BadRequestException('Skill already added');
//         }

//         let skill: UsersSkillsEntity;
//         if (exists) {
//             skill = exists;
//         } else {
//             skill = this.userSkillRepo.create({
//                 userId,
//                 skillId: dto.skill_id,
//             });
//         }

//         await this.userSkillRepo.save(skill);

//         // Delete existing relationships if updating
//         if (exists) {
//             await this.companySkillRepo.delete({ skillId: skill.id });
//             await this.schoolSkillRepo.delete({ skillId: skill.id });
//         }

//         // Insert new relationships
//         if (dto.companies) {
//             const companySkills = dto.companies.map((companyId) => ({
//                 skillId: skill.id,
//                 companyId,
//             }));
//             await this.companySkillRepo.insert(companySkills);
//         }

//         if (dto.schools) {
//             const schoolSkills = dto.schools.map((schoolId) => ({
//                 skillId: skill.id,
//                 schoolId,
//             }));
//             await this.schoolSkillRepo.insert(schoolSkills);
//         }

//         return skill;
//     }
// }