import request, { GraphQLClient } from "graphql-request";

type FetcherParams = {
  query: string;
  variables?: any;
};

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_API_URL);

export const fetcher = ({ query, variables }: FetcherParams) =>
  request(import.meta.env.VITE_GRAPHQL_API_URL, query, variables);

export default client;
