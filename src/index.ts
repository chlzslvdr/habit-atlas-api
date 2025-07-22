import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { createContext } from './context';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => createContext({ req }),
});

server.listen().then(({ url }) => {
  console.info(`🚀 Habit Atlas API running at ${url}`);
});
