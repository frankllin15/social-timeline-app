import { mockData } from './mockData';

export const mockPostService = () => ({
  getPost: jest.fn().mockImplementation((id) => {
    const post = mockData.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }),
  getPosts: jest.fn().mockReturnValue(mockData.posts),
  createPost: jest.fn().mockImplementation((input) => {
    const user = mockData.users.find((user) => user.id === input.authorId);
    if (!user) {
      throw new Error('User not found');
    }

    return { content: input.content, id: '3' };
  }),
  updatePost: jest.fn().mockImplementation((input) => {
    const post = mockData.users.find((p) => p.id === input.pubId);
    if (!post) {
      throw new Error('Post not found');
    }
    return { content: input.content, id: input.pubId };
  }),
  deletePost: jest.fn().mockImplementation((id) => {
    const post = mockData.posts.find((p) => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
  }),
  createComment: jest.fn().mockImplementation((input) => {
    const post = mockData.posts.find((p) => p.id === input.postId);
    const user = mockData.users.find((u) => u.id === input.authorId);
    if (!post || !user) {
      throw new Error('Post or user not found');
    }
  }),
  updateComment: jest.fn().mockImplementation((input) => {
    const comment = mockData.comments.find((c) => c.id === input.pubId);
    if (!comment) {
      throw new Error('Comment not found');
    }
  }),
  deleteComment: jest.fn().mockImplementation((id) => {
    const comment = mockData.comments.find((c) => c.id === id);
    if (!comment) {
      throw new Error('Comment not found');
    }
  }),
  likePost: jest.fn().mockImplementation((input) => {
    const post = mockData.posts.find((p) => p.id === input.postId);
    const user = mockData.users.find((u) => u.id === input.authorId);
    if (!post || !user) {
      throw new Error('Post or user not found');
    }
  }),
  unlikePost: jest.fn().mockImplementation((input) => {
    const post = mockData.posts.find((p) => p.id === input.postId);
    const user = mockData.users.find((u) => u.id === input.authorId);
    if (!post || !user) {
      throw new Error('Post or user not found');
    }
  }),
});
