import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private dbService: PrismaService) {}

  /**
   * Get All Users
   * @returns
   */
  async findAllUser() {
    return await this.dbService.user.findMany();
  }

  /**
   * Create User
   * @param data
   */
  async createData(data: CreateUserDto) {
    return await this.dbService.user.create({
      data,
    });
  }

  /**
   * Update User
   * @param id
   * @param data
   */
  async updateData(id: number, data: CreateUserDto) {
    return await this.dbService.user.update({
      data,
      where: {
        id,
      },
    });
  }

  /**
   * Delete User
   * @param id
   */
  async deleteData(id: number) {
    return await this.dbService.user.delete({
      where: {
        id,
      },
    });
  }
}
