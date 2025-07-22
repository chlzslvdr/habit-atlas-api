import { habitResolvers } from './habit';

export const resolvers = {
  Query: {
    ...habitResolvers.Query,
  },
  Mutation: {
    ...habitResolvers.Mutation,
  },
};
