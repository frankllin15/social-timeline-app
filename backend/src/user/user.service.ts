import { CreateUserInput, UpdateUserInput } from './../graphql';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaClient';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return await this.prismaService.user.findMany();
  }
  async getUser(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async createUser(user: CreateUserInput) {
    return await this.prismaService.user.create({
      data: {
        ...user,
      },
    });
  }
  async updateUser(id: string, user: UpdateUserInput) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        ...user,
      },
    });
  }
  async deleteUser(id: string) {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
