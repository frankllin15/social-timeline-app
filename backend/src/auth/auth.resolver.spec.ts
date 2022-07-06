import { mockAuthService } from './../../test/mocks/mockAuthService';
import { AuthService } from './auth.service';
import { PrismaService } from './../PrismaClient';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { mockData } from '../../test/mocks/mockData';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useFactory: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  test('#login - give a valid email and password, should return a user', async () => {
    const input = {
      email: 'john@email.com',
      password: 'test',
    };
    const expectedResult = {
      __typename: 'User',
      ...mockData.users[0],
    };
    const result = await resolver.login(input.email, input.password);

    expect(service.login).toHaveBeenCalledWith(input.email, input.password);
    expect(result).toEqual(expectedResult);
  });
  describe('exeption', () => {
    test('#login - give a invalid email and password, should throw an error', async () => {
      const input = {
        email: 'invalid@email.com',
        password: 'invalid',
      };
      const expectedResult = {
        __typename: 'Error',
        message: 'Invalid email or password',
      };
      const result = await resolver.login(input.email, input.password);

      expect(service.login).toHaveBeenCalledWith(input.email, input.password);
      expect(result).toEqual(expectedResult);
    });
  });
});
