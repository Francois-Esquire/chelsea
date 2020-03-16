import { gql } from 'apollo-server';

export default gql`
  directive @performance on FIELD_DEFINITION

  interface Node {
    id: ID!
  }

  type Memory implements Node {
    id: ID!
    name: String
    location: Float
    players: [Player]
  }

  type Player implements Node {
    id: ID!
    username: String
    topScore: Float
  }

  type Query {
    me: Player @performance
    memories: [Memory] @performance
    players: [Player] @performance
  }

  type Mutation {

    # player management
    addPlayer(username: String!): Player @performance
    removePlayer(id: ID!): Player @performance
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;