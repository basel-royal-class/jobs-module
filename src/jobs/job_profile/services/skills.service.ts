// import { Injectable } from '@nestjs/common';
// import { CreateSkillDto } from '../dtos/create.skill.dto';
// import { UpdateSkillDto } from '../dtos/update-skill.dto';
// import { SkillsRepository } from '../repositories/skills.repository';

// @Injectable()
// export class SkillsService {
//   constructor(
//     private readonly repository: SkillsRepository,
//   ) { }


//   async create(createSkillDto: CreateSkillDto, userId: number) {
//     return {
//       success: true,
//       data: await this.repository.create(createSkillDto, userId)
//     };
//   }

//   async getUserSkills() {
//     return `This action returns all skills`;
//   }

//   async findOne(id: number) {
//     return `This action returns a #${id} skill`;
//   }

//   async update(id: number, updateSkillDto: UpdateSkillDto) {
//     return `This action updates a #${id} skill`;
//   }

//   async delete(id: number) {
//     return `This action removes a #${id} skill`;
//   }
// }
