import { IsArray, IsInt, IsNotEmpty } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty()
    @IsInt()
    skill_id: number;

    @IsArray()
    @IsInt({ each: true })
    companies: number[];

    @IsArray()
    @IsInt({ each: true })
    schools: number[];
}
