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
import { IsRequiredWhenIsAdministrator } from 'src/common/validators/isRequiredWhenIsAdministrator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  isAdminValidation: IsRequiredWhenIsAdministrator;

  constructor(private prisma: PrismaService) {
    this.isAdminValidation = new IsRequiredWhenIsAdministrator();
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (
      !this.isAdminValidation.validate('administrator', {
        area: createUserDto.area,
        type: createUserDto.type,
      })
    ) {
      throw new NotAcceptableException(
        "The area field is required when 'type' is set to 'administrator'.",
      );
    }

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

//   async login(loginData: LoginUserDto) {
//     const { email, password } = loginData;

//     const user = await this.prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     if (user.type == 'administrator') {
//       throw new UnauthorizedException('You should login by the admin area');
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid password');
//     }

//     return 'User Auth Completed!';
//   }

  async findOneByEmail(usernameEmail: string) {
    const userWithEmail = await this.prisma.user.findUnique({
      where: {
        email: usernameEmail,
      },
    });

    return userWithEmail;
  }

  async loginAdmin(loginData: LoginUserDto) {
    const { email, password } = loginData;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.type == 'administrator') {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password.');
      }

      return 'Admin Auth Completed!';
    }

    return "You don't have permission to access this area.";
  }

  async adminGetUsers() {
    return this.prisma.user.findMany();
  }

  async adminGetReports() {
    return 'Reports.';
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
      throw new NotFoundException("User doesn't exists.");
    }

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("User doesn't exist.");
    }

    if (user.status === 'disabled') {
      throw new NotFoundException('User is already disabled or deleted.');
    }

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: { status: 'disabled' },
    });
  }
}
