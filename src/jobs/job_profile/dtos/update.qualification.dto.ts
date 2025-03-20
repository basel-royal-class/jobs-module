import { PartialType } from "@nestjs/mapped-types";
import { CreateQualificationDto } from "./create.qualification.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateQualificationDto extends PartialType(CreateQualificationDto) {
    @IsNotEmpty()
    id: number;
}