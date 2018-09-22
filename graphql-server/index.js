import { ApolloServer } from 'apollo-server';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const PORT = 3030;
const REST_SERVER_URL = 'http://localhost:3040';

const context = {
    restURL: REST_SERVER_URL,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen({
  port: PORT,
}).then( ({ url }) => {
  console.log(`graphql server url: ${url}`);
} );
