import { Comment, Post, User } from '@prisma/client';

type DataType = {
  users: User[];
  posts: Post[];
  comments: Comment[];
};

export const mockData: DataType = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@email.com',
      password: 'test',
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    },
  ],
  posts: [
    {
      id: '1',
      content: 'test',
      authorId: '1',
      createdAt: new Date('2020-02-01'),
      updatedAt: new Date('2020-02-01'),
    },
  ],
  comments: [
    {
      id: '1',
      content: 'test',
      authorId: '1',
      postId: '1',
      createdAt: new Date('2020-03-01'),
      updatedAt: new Date('2020-03-01'),
    },
  ],
};
