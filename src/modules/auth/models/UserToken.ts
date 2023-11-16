import { ApiProperty } from '@nestjs/swagger';

export class UserToken {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
