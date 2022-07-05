import {
  CreateUserInput,
  DefaultResult,
  UpdateUserInput,
  UserResult,
  UsersResult,
} from './../graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { createGenericError } from '../helpers/GraphqlHelpers';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  async getUser(@Args('id') id: string): Promise<UserResult> {
    try {
      const user = await this.userService.getUser(id);
      if (!user) {
        throw new Error('User not found');
      }
      return {
        __typename: 'User',
        ...user,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }
  @Query('users')
  /* istanbul ignore next */
  async getUsers(): Promise<UsersResult> {
    try {
      const items = await this.userService.getUsers();
      return {
        items,
        __typename: 'Users',
      };
    } catch (error) {
      createGenericError(error);
    }
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput): Promise<UserResult> {
    try {
      const user = await this.userService.createUser(input);
      return {
        __typename: 'User',
        ...user,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<UserResult> {
    try {
      const user = await this.userService.updateUser(id, input);
      return {
        __typename: 'User',
        ...user,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: string): Promise<DefaultResult> {
    try {
      await this.userService.deleteUser(id);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: createGenericError(error),
      };
    }
  }
}
