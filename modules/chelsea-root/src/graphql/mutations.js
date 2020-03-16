import { PlayerFragment } from './fragments';

export const AddPlayerMutation = `
  ${PlayerFragment}
  mutation AddPlayer($username: String!) {
    addPlayer(username: $username) {
      ...PlayerFragment
    }
  }
`.trim();

export const RemovePlayerMutation = `
  ${PlayerFragment}
  mutation RemovePlayer($id: ID!) {
    removePlayer(id: $id) {
      ...PlayerFragment
    }
  }
`.trim();

export const addPlayer = ({ username }) => ({
  mutation: AddPlayerMutation,
  variables: { username },
});

export const removePlayer = ({ id }) => ({
  mutation: RemovePlayerMutation,
  variables: { id },
});
