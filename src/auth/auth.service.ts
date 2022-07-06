import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: UserDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the db
    try {
      const user = await this.prisma.users.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hash,
        },
        // select: { // when only select for response
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });
      // delete user.password; // delete response for only dto

      // return the saved user
      // return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exist!');
          // throw new ForbiddenException('Email already exist!');
        }
      }

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception
    // if (!user) throw new ForbiddenException('Email doesn`t exist!');
    if (!user) throw new BadRequestException('Email doesn`t exist!');

    // compare password
    const passMatches = await argon.verify(user.password, dto.password);

    // if password incorrect throw exception
    if (!passMatches)
      throw new BadRequestException('Email or password Incorrect!');
    // throw new ForbiddenException('Email or password Incorrect!');

    // send back the user
    // delete user.password;
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
