import { PrismaService } from './../PrismaClient';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  providers: [PostService, PostResolver, PrismaService],
})
export class PostModule {}
