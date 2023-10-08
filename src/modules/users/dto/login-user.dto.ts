import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, ValidateIf, IsEmpty } from 'class-validator';

export class LoginUserDto {

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

}