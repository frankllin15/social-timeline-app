import { mockPostService } from '../../test/mocks/mockPostService';
import { PostService } from './post.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PostResolver } from './post.resolver';
import { mockData } from '../../test/mocks/mockData';

describe('PostResolver', () => {
  let resolver: PostResolver;
  let service: PostService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        { provide: PostService, useFactory: mockPostService },
      ],
    }).compile();

    resolver = module.get<PostResolver>(PostResolver);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  test('getPosts - should return a object whith __typename equals "PostList" and a array of Posts', async () => {
    const expectedResult = {
      __typename: 'PostList',
      items: mockData.posts,
    };
    const input = {
      order: 'desc',
      take: 2,
      orderBy: 'updatedAt',
    };
    const result = await resolver.getPosts(input);

    expect(service.getPosts).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('#getPost - given a valid postId should return a object whith __typename equals "Post" and a Post', async () => {
    const expectedResult = {
      __typename: 'Post',
      ...mockData.posts[0],
    };
    const id = mockData.posts[0].id;
    const result = await resolver.getPost(id);

    expect(service.getPost).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  test('#createPost - given a valid userId return a object whith __typename equals "Post" and a Post', async () => {
    const input = {
      content: 'test',
      authorId: '1',
    };
    const expectedResult = {
      __typename: 'Post',
      content: 'test',
      id: '3',
    };
    const result = await resolver.createPost(input);

    expect(service.createPost).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('#updatePost - given a valid pubId, should return a object whith __typename equals "Post" and a Post', async () => {
    const input = {
      pubId: '1',
      content: 'test',
    };
    const expectedResult = {
      __typename: 'Post',
      content: 'test',
      id: '1',
    };
    const result = await resolver.updatePost(input);

    expect(service.updatePost).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('#deletePost - given a valid id, should return a object with success equals true', async () => {
    const id = '1';
    const expectedResult = {
      success: true,
    };
    const result = await resolver.deletePost(id);

    expect(service.deletePost).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  test('createComment - given a valid userId and postId, should return a object with success equals true', async () => {
    const input = {
      authorId: '1',
      postId: '1',
      content: 'test',
    };
    const expectedResult = {
      success: true,
    };
    const result = await resolver.createComment(input);

    expect(service.createComment).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });
  test('#updateComment - given a valid commentId, should return a object with success equals true', async () => {
    const input = {
      pubId: '1',
      content: 'test',
    };
    const expectedResult = {
      success: true,
    };
    const result = await resolver.updateComment(input);

    expect(service.updateComment).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });
  test('#deleteComment - given a valid id, should return a object with success equals true', async () => {
    const id = '1';
    const expectedResult = {
      success: true,
    };
    const result = await resolver.deleteComment(id);

    expect(service.deleteComment).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  test('likePost - given a valid userId and postId, should return a object with success equals true', async () => {
    const input = {
      authorId: '1',
      postId: '1',
    };
    const expectedResult = {
      success: true,
    };
    const result = await resolver.likePost(input);

    expect(service.likePost).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('unlikePost - given a valid userId and postId, should return a object with success equals true', async () => {
    const input = {
      authorId: '1',
      postId: '1',
    };
    const expectedResult = {
      success: true,
    };
    const result = await resolver.unlikePost(input);

    expect(service.unlikePost).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  describe('exceptions', () => {
    test('#createPost - given a nonexistent userId, should return a error', async () => {
      const input = {
        content: 'test',
        authorId: '4',
      };
      const expectedResult = {
        __typename: 'Error',
        message: 'User not found',
      };
      const result = await resolver.createPost(input);

      expect(service.createPost).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });
  });
  test('#getPosts - when ocurrs an error, should return a error', async () => {
    const input = {
      order: 'desc',
      take: 2,
      orderBy: 'updatedAt',
    };
    const expectedResult = {
      __typename: 'Error',
      message: 'Error',
    };
    service.getPosts = jest.fn().mockImplementation(() => {
      throw new Error('Error');
    });

    const result = await resolver.getPosts(input);

    expect(service.getPosts).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('#getPost - given a nonexistent postId, should return a error', async () => {
    const expectedResult = {
      __typename: 'Error',
      message: 'Post not found',
    };
    const id = '4';
    const result = await resolver.getPost(id);

    expect(service.getPost).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  test('#updatePost - given a nonexistent pubId, should return a error', async () => {
    const input = {
      pubId: '4',
      content: 'test',
    };
    const expectedResult = {
      __typename: 'Error',
      message: 'Post not found',
    };
    const result = await resolver.updatePost(input);

    expect(service.updatePost).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('#deletePost - given a nonexistent id, should return a error', async () => {
    const id = '4';
    const expectedResult = {
      error: {
        __typename: 'Error',
        message: 'Post not found',
      },
      success: false,
    };
    const result = await resolver.deletePost(id);

    expect(service.deletePost).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  test('#createComment - given a nonexistent userId and postId, should return a error', async () => {
    const input = {
      authorId: '4',
      postId: '4',
      content: 'test',
    };
    const expectedResult = {
      error: {
        __typename: 'Error',
        message: 'Post or user not found',
      },
      success: false,
    };
    const result = await resolver.createComment(input);

    expect(service.createComment).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });
  test('#updateComment - given a nonexistent commentId, should return a error', async () => {
    const input = {
      pubId: '4',
      content: 'test',
    };
    const expectedResult = {
      error: {
        __typename: 'Error',
        message: 'Comment not found',
      },
      success: false,
    };
    const result = await resolver.updateComment(input);

    expect(service.updateComment).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });
  test('#deleteComment - given a nonexistent id, should return a error', async () => {
    const id = '4';
    const expectedResult = {
      error: {
        __typename: 'Error',
        message: 'Comment not found',
      },
      success: false,
    };
    const result = await resolver.deleteComment(id);

    expect(service.deleteComment).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  test('#likePost - given a nonexistent userId and postId, should return a error', async () => {
    const input = {
      authorId: '4',
      postId: '4',
    };
    const expectedResult = {
      error: {
        __typename: 'Error',
        message: 'Post or user not found',
      },
      success: false,
    };
    const result = await resolver.likePost(input);

    expect(service.likePost).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });

  test('#unlikePost - given a nonexistent userId and postId, should return a error', async () => {
    const input = {
      authorId: '4',
      postId: '4',
    };
    const expectedResult = {
      error: {
        __typename: 'Error',
        message: 'Post or user not found',
      },
      success: false,
    };
    const result = await resolver.unlikePost(input);

    expect(service.unlikePost).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });
});
