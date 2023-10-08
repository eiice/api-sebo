import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, ValidateIf, IsEmpty } from 'class-validator';
import { IsRequiredIfAdministrator } from 'src/modules/common/validators/isRequiredAdministrator';

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
    @IsString()
    @ValidateIf((o) => o.type === 'administrator', {
      message: 'The area field is required when type is set to administrator.',
    })
    area: string;

}