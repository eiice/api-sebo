import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserFromJwt } from '../auth/models/UserFromJwt';

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
    
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
      return this.usersService.findAll();
    }
    
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: UpdateUserDto, isArray: true })
  @Put()
  async update(@Body() data: UpdateUserDto) {
      return this.usersService.update(data);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ type: UpdateUserDto, isArray: true })
    @Delete()
  async delete(@Body() data: DeleteUserDto) {
      return this.usersService.delete(data);
    }
}

@Controller('admin')
export class AdminController {
    constructor(private readonly usersService: UsersService) {}
    
    @UseGuards(JwtAuthGuard)
  @Get('reports')
  async reports() {
      return this.usersService.adminGetReports();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers() {
    return this.usersService.adminGetUsers();
  }

}

