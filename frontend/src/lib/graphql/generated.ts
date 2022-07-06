import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateCommentInput = {
  authorId: Scalars['String'];
  content: Scalars['String'];
  postId: Scalars['String'];
};

export type CreatePostInput = {
  authorId: Scalars['String'];
  content: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type DefaultResult = {
  __typename?: 'DefaultResult';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Error = {
  __typename?: 'Error';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Like = {
  __typename?: 'Like';
  author: User;
  id: Scalars['String'];
};

export type LikePostInput = {
  authorId: Scalars['String'];
  postId: Scalars['String'];
};

export type LoginResult = Error | User;

export type Mutation = {
  __typename?: 'Mutation';
  /** Cria um novo comentário para o post com o id informado */
  createComment: DefaultResult;
  /** Cria um novo post */
  createPost: SimplePostResult;
  /** Cria um novo usuario */
  createUser: UserResult;
  /** Deleta o comentário com o id informado */
  deleteComment: DefaultResult;
  /** Deleta o post com o id informado */
  deletePost: DefaultResult;
  /** Deleta o usuario com o id especificado */
  deleteUser: DefaultResult;
  /** Cria uma relação de like para o post com o id informado */
  likePost: DefaultResult;
  /** Retorna o usuário logado */
  login: LoginResult;
  /** Deleta a relação de like com o id informado */
  unlikePost: DefaultResult;
  /** Atualiza o comentário com o id informado */
  updateComment: DefaultResult;
  /** Atualiza o post com o id informado */
  updatePost: SimplePostResult;
  /** Atualiza as informacoes do usuario com o id especificado */
  updateUser: UserResult;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLikePostArgs = {
  input: LikePostInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUnlikePostArgs = {
  input: LikePostInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdatePublicationInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePublicationInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateUserInput>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Array<Like>;
  updatedAt: Scalars['DateTime'];
};

export type PostList = {
  __typename?: 'PostList';
  items: Array<Post>;
};

export type PostResult = Error | Post;

export type PostsInput = {
  order?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PostsResult = Error | PostList;

export type Query = {
  __typename?: 'Query';
  /** Retorna o post com o id informado */
  post: PostResult;
  /** Retorna todos os posts */
  posts: PostsResult;
  /** Retorna o usuario com o id especificado */
  user?: Maybe<UserResult>;
  /** Retorna todos os usuarios */
  users?: Maybe<UsersResult>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  input?: InputMaybe<PostsInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type SimplePost = {
  __typename?: 'SimplePost';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type SimplePostResult = Error | SimplePost;

/** Input de atualização generico para Posts ou Pomments */
export type UpdatePublicationInput = {
  content?: InputMaybe<Scalars['String']>;
  pubId: Scalars['String'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

/** Retorna um usuário pelo ID ou um erro se não encontrar */
export type UserResult = Error | User;

export type Users = {
  __typename?: 'Users';
  items?: Maybe<Array<Maybe<User>>>;
};

/** Retorna uma lista de usuários ou um array vazio */
export type UsersResult = Error | Users;

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'Error', message?: string | null, code?: string | null } | { __typename: 'User', id: string, name: string, email: string, password?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<CreateUserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename: 'Error', message?: string | null, code?: string | null } | { __typename: 'User', id: string, name: string, email: string, password?: string | null } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename: 'Error', message?: string | null, code?: string | null } | { __typename: 'SimplePost', id: string, content: string, createdAt: any, updatedAt: any } };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DefaultResult', success?: boolean | null, error?: { __typename?: 'Error', message?: string | null } | null } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePublicationInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename: 'Error', message?: string | null, code?: string | null } | { __typename: 'SimplePost', id: string, content: string, createdAt: any, updatedAt: any } };

export type LikePostMutationVariables = Exact<{
  input: LikePostInput;
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'DefaultResult', success?: boolean | null, error?: { __typename?: 'Error', message?: string | null } | null } };

export type UnlikePostMutationVariables = Exact<{
  input: LikePostInput;
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'DefaultResult', success?: boolean | null, error?: { __typename?: 'Error', message?: string | null } | null } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'DefaultResult', success?: boolean | null, error?: { __typename?: 'Error', message?: string | null } | null } };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdatePublicationInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'DefaultResult', success?: boolean | null, error?: { __typename?: 'Error', message?: string | null } | null } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DefaultResult', success?: boolean | null, error?: { __typename?: 'Error', message?: string | null } | null } };

export type PostsQueryVariables = Exact<{
  input?: InputMaybe<PostsInput>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename: 'Error', message?: string | null, code?: string | null } | { __typename: 'PostList', items: Array<{ __typename?: 'Post', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string, name: string, email: string }, likes: Array<{ __typename?: 'Like', id: string, author: { __typename?: 'User', id: string, name: string } }>, comments: Array<{ __typename: 'Comment', id: string, content: string, author?: { __typename?: 'User', name: string } | null }> }> } };

export type PostQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename: 'Error', message?: string | null, code?: string | null } | { __typename: 'Post', id: string, content: string, createdAt: any, updatedAt: any, comments: Array<{ __typename: 'Comment', id: string, content: string, updatedAt: any, author?: { __typename?: 'User', name: string, id: string } | null }>, likes: Array<{ __typename?: 'Like', author: { __typename?: 'User', id: string, name: string } }>, author: { __typename?: 'User', id: string, name: string } } };


export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on User {
      __typename
      id
      name
      email
      password
    }
    ... on Error {
      __typename
      message
      code
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const CreateUserDocument = `
    mutation CreateUser($input: CreateUserInput) {
  createUser(input: $input) {
    ... on User {
      __typename
      id
      name
      email
      password
    }
    ... on Error {
      __typename
      message
      code
    }
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    );
export const CreatePostDocument = `
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on SimplePost {
      __typename
      id
      content
      createdAt
      updatedAt
    }
    ... on Error {
      __typename
      message
      code
    }
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const DeletePostDocument = `
    mutation DeletePost($deletePostId: ID!) {
  deletePost(id: $deletePostId) {
    success
    error {
      message
    }
  }
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      ['DeletePost'],
      (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
      options
    );
export const UpdatePostDocument = `
    mutation UpdatePost($input: UpdatePublicationInput!) {
  updatePost(input: $input) {
    ... on SimplePost {
      __typename
      id
      content
      createdAt
      updatedAt
    }
    ... on Error {
      __typename
      message
      code
    }
  }
}
    `;
export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      ['UpdatePost'],
      (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers)(),
      options
    );
export const LikePostDocument = `
    mutation LikePost($input: LikePostInput!) {
  likePost(input: $input) {
    success
    error {
      message
    }
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      ['LikePost'],
      (variables?: LikePostMutationVariables) => fetcher<LikePostMutation, LikePostMutationVariables>(client, LikePostDocument, variables, headers)(),
      options
    );
export const UnlikePostDocument = `
    mutation UnlikePost($input: LikePostInput!) {
  unlikePost(input: $input) {
    success
    error {
      message
    }
  }
}
    `;
export const useUnlikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>(
      ['UnlikePost'],
      (variables?: UnlikePostMutationVariables) => fetcher<UnlikePostMutation, UnlikePostMutationVariables>(client, UnlikePostDocument, variables, headers)(),
      options
    );
export const CreateCommentDocument = `
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    success
    error {
      message
    }
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['CreateComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const UpdateCommentDocument = `
    mutation UpdateComment($input: UpdatePublicationInput!) {
  updateComment(input: $input) {
    success
    error {
      message
    }
  }
}
    `;
export const useUpdateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>(
      ['UpdateComment'],
      (variables?: UpdateCommentMutationVariables) => fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(client, UpdateCommentDocument, variables, headers)(),
      options
    );
export const DeleteCommentDocument = `
    mutation DeleteComment($deleteCommentId: ID!) {
  deleteComment(id: $deleteCommentId) {
    error {
      message
    }
    success
  }
}
    `;
export const useDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
      ['DeleteComment'],
      (variables?: DeleteCommentMutationVariables) => fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(client, DeleteCommentDocument, variables, headers)(),
      options
    );
export const PostsDocument = `
    query Posts($input: PostsInput) {
  posts(input: $input) {
    ... on PostList {
      __typename
      items {
        id
        content
        createdAt
        updatedAt
        author {
          id
          name
          email
        }
        likes {
          id
          author {
            id
            name
          }
        }
        comments {
          __typename
          id
          content
          author {
            name
          }
        }
      }
    }
    ... on Error {
      __typename
      message
      code
    }
  }
}
    `;
export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsQuery, TError, TData>(
      variables === undefined ? ['Posts'] : ['Posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(client, PostsDocument, variables, headers),
      options
    );
export const PostDocument = `
    query Post($postId: ID!) {
  post(id: $postId) {
    ... on Post {
      __typename
      id
      content
      comments {
        __typename
        id
        content
        updatedAt
        author {
          name
          id
        }
      }
      likes {
        author {
          id
          name
        }
      }
      author {
        id
        name
      }
      createdAt
      updatedAt
    }
    ... on Error {
      __typename
      message
      code
    }
  }
}
    `;
export const usePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostQueryVariables,
      options?: UseQueryOptions<PostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostQuery, TError, TData>(
      ['Post', variables],
      fetcher<PostQuery, PostQueryVariables>(client, PostDocument, variables, headers),
      options
    );