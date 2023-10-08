import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    
    async create(createUserDto: CreateUserDto) {

        const userExists = await this.prisma.user.findUnique({
            where: {
                email: createUserDto.email,
            }
        });

        if (userExists) {
            throw new ConflictException('User already exists.');
        }

        const data: Prisma.UserCreateInput = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
            status: "active"
        };

        const user = await this.prisma.user.create({
            data,
        }); 

        return user;
    }


    async login(loginData: LoginUserDto) {
        const { email, password } = loginData;
    
        const user = await this.prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user.type == 'administrator') {
            throw new UnauthorizedException('You should login by the admin area');
        }
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid password');
        }
    
        return "Usuário Autenticado!";
    }

    async loginAdmin(loginData: LoginUserDto) {
        const { email, password } = loginData;
    
        const user = await this.prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user.type == 'administrator') {
            if (!user) {
                throw new NotFoundException('User not found');
              }
          
              const isPasswordValid = await bcrypt.compare(password, user.password);
          
              if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid password');
              }
          
              return "User Auth Completed!";
        }
        
        return "You don't have permission to access this area";

    }

    async adminGetUsers() {
        return this.prisma.user.findMany();
    }

    async adminGetReports() {
        return "Reports.";
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async update(id: string, data: UpdateUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new Error("User doesn't exists.");
        }

        return await this.prisma.user.update({
            data, 
            where: { 
                id,
            },
        });
    }

    async delete(id: string, data: DeleteUserDto) {
        const user = await this.prisma.user.findUnique({
          where: {
            id,
          },
        });
      
        if (!user) {
          throw new Error("User doesn't exist.");
        }
      
        if (user.status === "disabled") {
          throw new Error("User is already disabled or deleted.");
        }
      
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: { status: "disabled" },
        });
      }
}
