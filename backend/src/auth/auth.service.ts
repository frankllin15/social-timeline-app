import { PrismaService } from '../PrismaClient';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    return user;
  }
}
