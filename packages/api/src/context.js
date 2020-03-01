const typeNames = {
  player: 'Player',
};

const players = new Map([
  {
    id: 10001,
    username: 'player-1',
    topScore: 12412535326,
  },
  {
    id: 10002,
    username: 'player-2',
    topScore: 325235,
  },
  {
    id: 10003,
    username: 'player-3',
    topScore: 6756e45,
  },
].map(player => [player.id, { ...player, __typename: typeNames.player }]));

function createPlayer(username) {
  return {
    __typename: typeNames.player,
    id: 1e5 + players.length,
    username,
    topScore: 0,
  };
}

function getPlayers() {
  return players.values();
}

function getPlayer(userId) {
  return players.get(userId);
}

function addPlayer(username) {
  const player = createPlayer(username);
  players.set(newPlayer.id, newPlayer);
  return player;
}

function removePlayer(userId) {
  const player = getPlayer(userId);
  players.delete(userId);
  return player;
}

export default function createContext() {
  return {
    getPlayers,
    getPlayer,
    addPlayer,
    removePlayer,
  };
}