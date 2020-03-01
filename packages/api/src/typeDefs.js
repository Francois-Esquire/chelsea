import { gql } from 'apollo-server';

export default gql`
  directive @performance on FIELD_DEFINITION

  interface Node {
    id: ID!
  }

  type Player implements Node {
    id: ID!
    username: String
    topScore: Float
  }

  type Query {
    me: Player @performance
    players: [Player] @performance
  }

  type Mutation {
    addPlayer(username: String!): Player @performance
    removePlayer(id: ID!): Player @performance
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;