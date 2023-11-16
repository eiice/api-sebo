import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UsersService } from '../users/users.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UserFromJwt } from './models/UserFromJwt';
import { UserEntity } from '../users/entity/users.entity';
import { LoginRequestDto } from './dtos/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(loginData: LoginRequestDto): Promise<any> {
    const { email, password } = loginData
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
        throw new UnauthorizedError('Invalid e-mail or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return await this.generateToken(user);
    }

    throw new UnauthorizedException("Invalid e-mail or password.");
  }


  async validateAdminUser(loginData: LoginRequestDto): Promise<any> {
    const { email, password } = loginData
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user.type !== 'administrator') {
        return "You don't have permission to access this area.";
    }

    if (isPasswordValid) {
      return await this.generateToken(user);
    }

    throw new UnauthorizedException("Invalid e-mail or password.");

  }

  async generateToken(payload: UserPayload) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: payload.id,
          email: payload.email,
        },
        {
          secret: process.env.JWT_TOKEN,
          expiresIn: '1h',
        },
      ),

    ]);

    return {
      accessToken
    };
  }


}
