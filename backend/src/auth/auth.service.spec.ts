import { PrismaService } from '../PrismaClient';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // it('should return a login payload', async () => {
  //   const user = {
  //     email: 'test@email.com',
  //     password: 'test',
  //   };
  //   const payload = await service.login(user.email, user.password);

  //   expect(payload).toBeDefined();
  //   expect(payload.email).toBe(user.email);
  // });
});
