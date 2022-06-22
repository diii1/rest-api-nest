import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
  async createData(data: any) {
    return await this.dbService.user.create({
      data,
    });
  }

  /**
   * Update User
   * @param id
   * @param data
   */
  async updateData(id: number, data: any) {
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
