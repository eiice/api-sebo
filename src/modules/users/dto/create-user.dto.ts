import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsEmpty, Validate } from 'class-validator';
import { IsRequiredWhenIsAdministrator } from 'src/common/validators/isRequiredWhenIsAdministrator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    password: string

    @ApiProperty()
    @IsEmpty()
    status: string

    @ApiProperty()
    type: string

    @ApiProperty()
    @Validate(IsRequiredWhenIsAdministrator, {
        message: "The area field is required when 'type' is set to 'administrator'.",
    })
    area: string;

}