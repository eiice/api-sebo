import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IsPublic } from '../auth/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @IsPublic()
  @ApiResponse({ type: CreateUserDto, isArray: true })
  async create(
    @Body(new ValidationPipe({ transform: true })) data: CreateUserDto,
  ) {
    return this.usersService.create(data);
  }

//   @Post('login')
//   @IsPublic()
//   @ApiResponse({ type: UserEntity })
//   async login(@Body() data: LoginUserDto) {
//     return this.usersService.login(data);
//   }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @IsPublic()
  async login(@Body() data: LoginUserDto) {
    return this.usersService.loginAdmin(data);
  }

  @Get('reports')
  async reports() {
    return this.usersService.adminGetReports();
  }

  @Get('users')
  async getUsers() {
    return this.usersService.adminGetUsers();
  }
}
