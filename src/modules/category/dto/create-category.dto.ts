import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @ApiProperty()
    name: string
    @IsString()
    @ApiProperty()
    description: string
    @IsEmpty()
    @ApiProperty()
    status: string
}
