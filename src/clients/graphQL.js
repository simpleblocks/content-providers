import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const createGraphQLClient = (url, token) => {
  const cache = new InMemoryCache();

  const httpLink = createHttpLink({
    uri: url,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: authLink.concat(httpLink),
  
    // Provide some optional constructor fields
    name: "react-web-client",
    version: "1.3",
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  return client
};

const BASE_QUERY = `
    id
    createdAt
    updatedAt
`

export const PAGE_LIST_QUERY = `
    ${BASE_QUERY}
    name
    slug
`

export const SECTION_LIST_QUERY = PAGE_QUERY

export const PAGE_CONTENT_QUERY = `
    ${BASE_QUERY}
    name
    slug
    components
`

export const SECTION_CONTENT_QUERY = PAGE_QUERY

export const PAGE_CONTEXT_QUERY = `
    ${BASE_QUERY}
    name
    slug
    context
`

export const SECTION_CONTEXT_QUERY = PAGE_QUERY



