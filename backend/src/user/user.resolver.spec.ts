import { mockUserService } from './../../test/mocks/mockUserService';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useFactory: mockUserService },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  test('#createUser - given a valid email, should return a User object with __typename equals "User"', async () => {
    const input = {
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    };
    const expectedResult = {
      __typename: 'User',
      id: '3',
      ...input,
    };
    const result = await resolver.createUser(input);
    expect(service.createUser).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('getUser - given a valid id, should return a User object with __typename equals "User"', async () => {
    const id = '1';
    const expectedResult = {
      __typename: 'User',
      id,
      name: 'John Doe',
      email: 'john@email.com',
      password: 'test',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    };
    const result = await resolver.getUser(id);
    expect(service.getUser).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  test('#updateUser - given a valid id, should return a User object with __typename equals "User"', async () => {
    const id = '1';
    const input = {
      name: 'New name',
      email: 'test@email.com',
      password: '123456',
    };
    const expectedResult = {
      __typename: 'User',
      id,
      ...input,
    };
    const result = await resolver.updateUser(id, input);
    expect(service.updateUser).toHaveBeenCalledWith(id, input);
    expect(result).toEqual(expectedResult);
  });
  test('#deleteUser - given a valid id, should return a User object with __typename equals "User"', async () => {
    const id = '1';
    const expectedResult = {
      success: true,
    };

    const result = await resolver.deleteUser(id);

    expect(service.deleteUser).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  describe('exeptions', () => {
    test('#createUser - given an email already registered, should return a object with __typename equals "Error"', async () => {
      const input = {
        name: 'Test',
        email: 'john@email.com',
        password: '123456',
      };
      const expectedResult = {
        __typename: 'Error',
        message: 'User already exists',
      };
      const result = await resolver.createUser(input);
      expect(service.createUser).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });

    test('#getUser - given an invalid id, should return a object with __typename equals "Error"', async () => {
      const id = '4';
      const expectedResult = {
        __typename: 'Error',
        message: 'User not found',
      };
      const result = await resolver.getUser(id);
      expect(service.getUser).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
    test('#updateUser - given an invalid id, should return a object with __typename equals "Error"', async () => {
      const id = '4';
      const input = {
        name: 'New name',
        email: 'test@email.com',
        password: '123456',
      };
      const expectedResult = {
        __typename: 'Error',
        message: 'User not found',
      };
      const result = await resolver.updateUser(id, input);
      expect(service.updateUser).toHaveBeenCalledWith(id, input);
      expect(result).toEqual(expectedResult);
    });
    test('#deleteUser - given an invalid id, should return a object with __typename equals "Error"', async () => {
      const id = '4';
      const expectedResult = {
        success: false,
        error: {
          __typename: 'Error',
          message: 'User not found',
        },
      };
      const result = await resolver.deleteUser(id);
      expect(service.deleteUser).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
