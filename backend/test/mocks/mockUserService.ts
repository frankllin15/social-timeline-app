import { mockData } from './mockData';

export const mockUserService = () => ({
  getUser: jest.fn().mockImplementation((id) => {
    const user = mockData.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }),
  createUser: jest.fn().mockImplementation((input) => {
    const alreadyExists = mockData.users.find(
      (user) => user.email === input.email,
    );
    if (alreadyExists) {
      throw new Error('User already exists');
    }
    return {
      id: '3',
      ...input,
    };
  }),

  updateUser: jest.fn().mockImplementation((id, input) => {
    const user = mockData.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id,
      ...input,
    };
  }),

  deleteUser: jest.fn().mockImplementation((id) => {
    const user = mockData.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
  }),
});
