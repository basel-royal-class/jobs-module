import { IsArray, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty()
    @IsInt()
    skill_id: number;

    @IsNotEmpty()
    @IsInt()
    user_id: number;

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    companies: number[];

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    schools: number[];
}
