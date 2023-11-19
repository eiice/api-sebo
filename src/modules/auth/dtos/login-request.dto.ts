import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
