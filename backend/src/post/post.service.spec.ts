import { mockData } from '../../test/mocks/mockData';
import { PrismaService } from './../PrismaClient';
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { Post } from '@prisma/client';

const mockPrismaService = () => ({
  post: {
    findMany: jest.fn().mockReturnValue(mockData.posts),
    findUnique: jest
      .fn()
      .mockImplementation((p) =>
        mockData.posts.find((post) => post.id === p.where.id),
      ),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

describe('PostService', () => {
  let service: PostService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useFactory: mockPrismaService },
        PostService,
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('getPosts - should an array of posts', async () => {
    // prisma.post.findMany = jest.fn().mockReturnValue(mockData.posts);
    const posts = await service.getPosts({
      order: 'desc',
      take: 2,
      orderBy: 'updatedAt',
    });

    expect(prisma.post.findMany).toHaveBeenCalledWith({
      orderBy: { updatedAt: 'desc' },
      take: 2,
      include: {
        author: true,
        comments: { include: { author: true, post: true } },
        likes: { include: { author: true } },
      },
    });

    expect(posts).toBeInstanceOf(Array<Post>);
  });
  it('getPost - should return a post with id "1"', async () => {
    const post = await service.getPost('1');
    const id = '1';
    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: {
        author: true,
        comments: { include: { author: true }, orderBy: { updatedAt: 'desc' } },
        likes: { include: { author: true } },
      },
    });

    expect(post).toEqual(mockData.posts[0]);
  });
  it('createPost - should save a post', async () => {
    await service.createPost({
      authorId: '1',
      content: 'test',
    });

    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        content: 'test',
        author: {
          connect: {
            id: '1',
          },
        },
      },
    });
  });
});
