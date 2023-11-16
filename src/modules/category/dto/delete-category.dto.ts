import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class DeleteCategoryDto {
    @IsEmpty()
    @ApiProperty()
    status: string;
}
