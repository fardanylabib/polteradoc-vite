import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URL } from '../constants/Env';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext(async(_, { headers }) => {
    if(window.token){
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${window.token}`,
        }
      }
    }
    return {headers};
});

const openLink = setContext(async(_, { headers }) => {
  return {headers};
});

export const secureClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const openClient = new ApolloClient({
  link: openLink.concat(httpLink),
  cache: new InMemoryCache()
});