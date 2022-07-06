import { mockData } from './mockData';

export const mockAuthService = () => ({
  login: jest.fn().mockImplementation((email, password) => {
    const user = mockData.users.find((user) => user.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }

    return {
      id: '1',
      ...user,
    };
  }),
});
