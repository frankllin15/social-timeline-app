
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreatePostInput {
    content: string;
    authorId: string;
}

export interface CreateCommentInput {
    content: string;
    postId: string;
    authorId: string;
}

export interface PostsInput {
    take?: Nullable<number>;
    orderBy?: Nullable<string>;
    order?: Nullable<string>;
}

export interface LikePostInput {
    postId: string;
    authorId: string;
}

export interface UpdatePublicationInput {
    pubId: string;
    content?: Nullable<string>;
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface IMutation {
    __typename?: 'IMutation';
    login(email: string, password: string): LoginResult | Promise<LoginResult>;
    createPost(input: CreatePostInput): SimplePostResult | Promise<SimplePostResult>;
    deletePost(id: string): DefaultResult | Promise<DefaultResult>;
    updatePost(input: UpdatePublicationInput): SimplePostResult | Promise<SimplePostResult>;
    createComment(input: CreateCommentInput): DefaultResult | Promise<DefaultResult>;
    deleteComment(id: string): DefaultResult | Promise<DefaultResult>;
    updateComment(input: UpdatePublicationInput): DefaultResult | Promise<DefaultResult>;
    likePost(input: LikePostInput): DefaultResult | Promise<DefaultResult>;
    unlikePost(input: LikePostInput): DefaultResult | Promise<DefaultResult>;
    createUser(input?: Nullable<CreateUserInput>): UserResult | Promise<UserResult>;
    updateUser(id: string, input?: Nullable<UpdateUserInput>): UserResult | Promise<UserResult>;
    deleteUser(id: string): DefaultResult | Promise<DefaultResult>;
}

export interface Post {
    __typename?: 'Post';
    id: string;
    content: string;
    comments: Comment[];
    likes: Like[];
    author: User;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface SimplePost {
    __typename?: 'SimplePost';
    id: string;
    content: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Comment {
    __typename?: 'Comment';
    id: string;
    content: string;
    author?: Nullable<User>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Like {
    __typename?: 'Like';
    id: string;
    author: User;
}

export interface PostList {
    __typename?: 'PostList';
    items: Post[];
}

export interface IQuery {
    __typename?: 'IQuery';
    posts(input?: Nullable<PostsInput>): PostsResult | Promise<PostsResult>;
    post(id: string): PostResult | Promise<PostResult>;
    user(id: string): Nullable<UserResult> | Promise<Nullable<UserResult>>;
    users(): Nullable<UsersResult> | Promise<Nullable<UsersResult>>;
}

export interface Error {
    __typename?: 'Error';
    message?: Nullable<string>;
    code?: Nullable<string>;
}

export interface DefaultResult {
    __typename?: 'DefaultResult';
    success?: Nullable<boolean>;
    error?: Nullable<Error>;
}

export interface User {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    password?: Nullable<string>;
}

export interface Users {
    __typename?: 'Users';
    items?: Nullable<Nullable<User>[]>;
}

export type DateTime = any;
export type LoginResult = User | Error;
export type PostsResult = PostList | Error;
export type PostResult = Post | Error;
export type SimplePostResult = SimplePost | Error;
export type UserResult = User | Error;
export type UsersResult = Users | Error;
type Nullable<T> = T | null;
