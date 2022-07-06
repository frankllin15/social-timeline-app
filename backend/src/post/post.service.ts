import { SimplePost } from './../graphql';
import {
  CreatePostInput,
  PostsInput,
  CreateCommentInput,
  UpdatePublicationInput,
  LikePostInput,
  Post,
} from '../graphql';
import { PrismaService } from '../PrismaClient';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost({
    authorId,
    content,
  }: CreatePostInput): Promise<SimplePost> {
    return await this.prismaService.post.create({
      data: {
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  async getPosts({
    order = 'desc',
    take = 10,
    orderBy = 'updatedAt',
  }: PostsInput) {
    return await this.prismaService.post.findMany({
      orderBy: { [orderBy]: order },
      take: take,
      include: {
        author: true,
        comments: { include: { author: true, post: true } },
        likes: { include: { author: true } },
      },
    });
  }

  async getPost(id: string): Promise<Post> {
    return await this.prismaService.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: { include: { author: true }, orderBy: { updatedAt: 'desc' } },
        likes: { include: { author: true } },
      },
    });
  }

  async updatePost({
    pubId,
    content,
  }: UpdatePublicationInput): Promise<SimplePost> {
    return await this.prismaService.post.update({
      where: { id: pubId },
      data: { content },
    });
  }

  async deletePost(id: string) {
    await this.prismaService.post.delete({
      where: { id },
    });
  }

  async createComment({ authorId, content, postId }: CreateCommentInput) {
    await this.prismaService.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }

  async updateComment({ pubId, content }: UpdatePublicationInput) {
    await this.prismaService.comment.update({
      where: { id: pubId },
      data: { content },
    });
  }

  async deleteComment(id: string) {
    await this.prismaService.comment.delete({
      where: { id },
    });
  }

  async likePost({ postId, authorId }: LikePostInput) {
    const like = await this.prismaService.like.findMany({
      where: { AND: [{ postId, authorId }] },
      select: { id: true },
    });

    if (like.length > 0) {
      throw new Error('You already liked this publication');
    }

    await this.prismaService.post.update({
      where: { id: postId },
      data: {
        likes: {
          create: {
            author: {
              connect: {
                id: authorId,
              },
            },
          },
        },
      },
    });
  }

  async unlikePost({ postId, authorId }: LikePostInput) {
    await this.prismaService.like.deleteMany({
      where: { AND: [{ postId, authorId }] },
    });
  }
}
