import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get Users
   * @returns
   */
  @Get()
  async users() {
    return await this.userService.findAllUser();
  }

  /**
   * Create User
   * @param body
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createData(body);
  }

  /**
   * Update User
   * @param id
   * @param body
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Put('/:id')
  async updateUser(@Param('id', ParseIntPipe) id, @Body() body: CreateUserDto) {
    return await this.userService.updateData(id, body);
  }

  /**
   * Delete User
   * @param id
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id) {
    return await this.userService.deleteData(id);
  }
}
