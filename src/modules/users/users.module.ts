import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminController, UsersController } from './users.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [UsersController, AdminController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
