import { PlayerFragment } from './fragments';

export const PlayersQuery = `
  ${PlayerFragment}
  query {
    me {
      ...PlayerFragment
    }
    players {
      ...PlayerFragment
    }
  }
`.trim();

export const queryPlayers = () => ({
  query: PlayersQuery,
});
