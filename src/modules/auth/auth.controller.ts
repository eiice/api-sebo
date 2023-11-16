import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginRequestDto } from './dtos/login-request.dto';


@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() data: LoginRequestDto) {
    return this.authService.validateUser(data);
  }

}

@Controller('admin')
export class AdminAuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @IsPublic()
    async loginAdmin(@Body() data: LoginRequestDto) {
      return this.authService.validateAdminUser(data);
    }
}