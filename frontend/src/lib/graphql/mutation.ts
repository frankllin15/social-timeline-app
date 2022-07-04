import { gql } from "graphql-request";

export const LOGIN_MUTATION = gql`
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

export const REGISTER_MUTATION = gql`
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

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on Post {
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

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      success
      error {
        message
      }
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($input: UpdatePublicationInput) {
    updatePost(input: $input) {
      ... on Post {
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
export const LIKE_POST_MUTATION = gql`
  mutation LikePost($input: LikePostInput!) {
    likePost(input: $input) {
      success
      error {
        message
      }
    }
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UnlikePost($input: LikePostInput!) {
    unlikePost(input: $input) {
      success
      error {
        message
      }
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      error {
        message
      }
    }
  }
`;
export const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComment($input: UpdatePublicationInput!) {
    updateComment(input: $input) {
      success
      error {
        message
      }
    }
  }
`;
export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($deleteCommentId: ID!) {
    deleteComment(id: $deleteCommentId) {
      error {
        message
      }
      success
    }
  }
`;
