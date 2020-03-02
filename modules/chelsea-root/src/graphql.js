const PlayerFragment = `
fragment PlayerFragment on Player {
  __typename
  id
  username
  topScore
}
`;

const PlayersQuery = `
  ${PlayerFragment}
  query {
    me {
      ...PlayerFragment
    }
    players {
      ...PlayerFragment
    }
  }
`;

const AddPlayerMutation = `
  ${PlayerFragment}
  mutation AddPlayer($username: String!) {
    addPlayer(username: $username) {
      ...PlayerFragment
    }
  }
`;

const RemovePlayerMutation = `
  ${PlayerFragment}
  mutation RemovePlayer($id: ID!) {
    removePlayer(id: $id) {
      ...PlayerFragment
    }
  }
`;

export const addPlayer = ({ username }) => ({
  mutation: AddPlayerMutation,
  variables: { username },
});

export const removePlayer = ({ id }) => ({
  mutation: RemovePlayerMutation,
  variables: { id },
});

export const queryPlayers = () => ({
  query: PlayersQuery,
});
