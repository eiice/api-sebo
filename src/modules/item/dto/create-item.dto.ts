import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";


export class CreateItemDto {
    @IsEmpty()
    @ApiProperty()
    id: string
    @IsString()
    @ApiProperty()
    title: string;
    @IsString()
    @ApiProperty()
    author: string;
    @IsString()
    @ApiProperty()
    category: string;
    @IsNumber()
    @ApiProperty({type: 'number', format: 'double'})
    price: number
    @IsString()
    @ApiProperty()
    description: string
    @IsEmpty()
    @ApiProperty()
    status: string;
    @IsEmpty()
    @ApiProperty({type: 'string', format: 'date', required: false})
    creationDate: string
    @IsString()
    @ApiProperty()
    periodicity: string;
    @IsEmpty()
    @ApiProperty()
    sellerId: string;
}
