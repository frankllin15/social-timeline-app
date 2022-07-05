import { Error } from '../graphql';

export const createGenericError = (error: any): Error => {
  return {
    __typename: 'Error',
    code: error.code,
    message: error.message,
  };
};
