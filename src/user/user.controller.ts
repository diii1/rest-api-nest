import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Users } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: Users) {
    return user;
  }

  // @Patch()
  // editUser() {
  //   return '';
  // }
}
