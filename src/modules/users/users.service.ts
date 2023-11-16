import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { IsRequiredIfAdministrator } from 'src/common/validators/isRequiredIfAdministrator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  isAdminValidation: IsRequiredIfAdministrator;

  constructor(private prisma: PrismaService) {
    this.isAdminValidation = new IsRequiredIfAdministrator();
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new ConflictException('User already exists.');
    }

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      status: 'active',
    };

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findOneByEmail(usernameEmail: string) {
    const userWithEmail = await this.prisma.user.findUnique({
      where: {
        email: usernameEmail,
      },
    });

    return userWithEmail;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.findOneByEmail(updateUserDto.email);
  
    if (!user.password) {
        throw new UnauthorizedException('')
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return await this.prisma.user.update({
      where: {
        email: updateUserDto.email,
      },
      data: {
        ...updateUserDto,
        password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : undefined
      }
    });
  }

  async delete(deleteUserDto: DeleteUserDto) {
    const { email, password } = deleteUserDto
    const user = await this.findOneByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new NotFoundException("Invalid e-mail or password.");
    }

    if (user.status === 'disabled') {
      throw new NotFoundException('User is already disabled or deleted.');
    }

    return await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: { 
        ...deleteUserDto,
        status: 'disabled' 
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
        where: {
            id
        }
    })
  }


  async adminGetUsers() {
    return this.prisma.user.findMany();
  }

  async adminGetReports() {
    return 'Reports.';
  }
}
