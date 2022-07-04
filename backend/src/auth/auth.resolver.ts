import { createGenericError } from 'src/helpers/GraphqlHelpers';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResult } from 'src/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResult> {
    try {
      const user = await this.authService.login(email, password);
      return {
        __typename: 'User',
        ...user,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }
}
