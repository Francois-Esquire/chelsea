export default {
  Node: {
    __resolveType: ({ __typename }) => __typename,
  },
  Query: {
    me: (_, __, context) => context.getPlayer(10001),
    players: (_, __, context) => context.getPlayers(),
  },
  Mutation: {
    addPlayer: (_, args, context) => context.addPlayer(args.username),
    removePlayer: (_, args, context) => context.removePlayer(args.id),
  },
};