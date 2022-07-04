import { createGenericError } from 'src/helpers/GraphqlHelpers';
import {
  CreateCommentInput,
  CreatePostInput,
  DefaultResult,
  LikePostInput,
  PostResult,
  PostsInput,
  PostsResult,
  UpdatePublicationInput,
} from './../graphql';
import { PostService } from './post.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('posts')
  async getPosts(@Args('input') input: PostsInput): Promise<PostsResult> {
    try {
      const items = await this.postService.getPosts(input);
      items[0];
      return {
        __typename: 'PostList',
        items,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }

  @Query('post')
  async getPost(@Args('id') id: string): Promise<PostResult> {
    try {
      const post = await this.postService.getPost(id);

      return {
        __typename: 'Post',
        ...post,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }

  @Mutation('createPost')
  async createPost(@Args('input') input: CreatePostInput): Promise<PostResult> {
    try {
      const post = await this.postService.createPost(input);
      return {
        __typename: 'Post',
        ...post,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }

  @Mutation('updatePost')
  async updatePost(
    @Args('input') input: UpdatePublicationInput,
  ): Promise<PostResult> {
    try {
      const post = await this.postService.updatePost(input);
      return {
        __typename: 'Post',
        ...post,
      };
    } catch (error) {
      return createGenericError(error);
    }
  }

  @Mutation('deletePost')
  async deletePost(@Args('id') id: string): Promise<DefaultResult> {
    try {
      await this.postService.deletePost(id);
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

  @Mutation('createComment')
  async createComment(
    @Args('input') input: CreateCommentInput,
  ): Promise<DefaultResult> {
    try {
      await this.postService.createComment(input);
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

  @Mutation('deleteComment')
  async deleteComment(@Args('id') id: string): Promise<DefaultResult> {
    try {
      await this.postService.deleteComment(id);
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

  @Mutation('updateComment')
  async updateComment(
    @Args('input') input: UpdatePublicationInput,
  ): Promise<DefaultResult> {
    try {
      await this.postService.updateComment(input);
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

  @Mutation('likePost')
  async likePost(@Args('input') input: LikePostInput): Promise<DefaultResult> {
    try {
      await this.postService.likePost(input);
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

  @Mutation('unlikePost')
  async unlikePost(
    @Args('input') input: LikePostInput,
  ): Promise<DefaultResult> {
    try {
      await this.postService.unlikePost(input);
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
