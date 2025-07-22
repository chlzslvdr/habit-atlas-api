import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Habit {
    id: ID!
    name: String!
    frequency: String!
    completedDates: [String]
  }

  type Query {
    habits: [Habit]
  }

  type Mutation {
    createHabit(name: String!, frequency: String!): Habit
    markHabitComplete(habitId: ID!, date: String!): Habit
  }
`;
