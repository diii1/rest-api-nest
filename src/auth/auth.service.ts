import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
      delete user.password; // delete response for only dto

      // return the saved user
      return user;
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
    delete user.password;
    return user;
  }
}
