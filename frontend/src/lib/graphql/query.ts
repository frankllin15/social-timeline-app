import { gql } from "graphql-request";

export const POSTS_QUERY = gql`
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

export const POST_QUERY = gql`
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
