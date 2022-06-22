/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
