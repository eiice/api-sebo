import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string;

  @ApiProperty()
  status: string;
}
