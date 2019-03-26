import PlayerType from 'types/player';

export default class APIService {
  
  /*
    Interface with RESTful CRUD API (mocked)
  */

  constructor (config) {
    // http config (i.e. headers, tokens)
    this.Player = new Model(config, this.unloadCache('Player'), () => this.loadCache('Player'));
  }

  unloadCache (dataType) {
    const deserializedData = JSON.parse(localStorage.getItem(dataType));
    return deserializedData || {};
  }

  loadCache (dataType) {
    const serializedData = JSON.stringify({ [dataType]: Model.InMemoryDataStore[dataType] });
    localStorage.setItem(dataType, serializedData);
  }
}

class Model {

  // mocked backend api (synchronous)
  static InMemoryDataStore = {

    Player: {
      __nextId: 1,
    },

    create (data, type) {
      const storedData = { id: this[type].__nextId, ...data };
      this[type][storedData.id] = storedData;
      // increment next model id
      this[type].__nextId++;
      return storedData;
    },

    read (id, type) {
      // get unit of id and type
      if (id !== undefined) return this[type][id] || null;
      // get collection of units of type
      const storeCollection = this[type];
      const queried = Object.keys(this[type]).reduce((collection, item) => {
        if (item !== '__nextId') collection.push(storeCollection[item]);
        return collection;
      }, []);
      // sort on "backend" before sending to downstream client
      if (queried.length) return queried.sort((a, b) => a.winnings > b.winnings ? -1: 1);
      return queried;
    },

    update (data, id, type) {
      return this[type][id] = { id, ...data };
    },

    delete (id, type) {
      delete this[type][id];
      return this[type][id];
    }
  };

  constructor (config, cache, push=noop=>noop) {
    // http config
    Model.InMemoryDataStore = { ...Model.InMemoryDataStore, ...cache };
    this.push = push;
  }

  async add (player) {
    const [valid, reason] = PlayerType(player);
    if (!valid) return reason;
    try {
      const newPlayer = await Model.InMemoryDataStore.create(player, 'Player');
      this.push(); // persist change to localStorage cache
      return newPlayer;
    } catch (e) {
      console.error('[API]: ', e);
    }
  }

  async get (playerId) {
    try {
      const players = await Model.InMemoryDataStore.read(playerId, 'Player');
      this.push(); // persist change to localStorage cache
      return players;
    } catch (e) {
      console.error('[API]: ', e);
    }
  }

  async update (player) {
    const [valid, reason] = PlayerType(player);
    if (!valid) return reason;
    try {
      const updatedPlayer = await Model.InMemoryDataStore.update(player, player.id, 'Player');
      this.push(); // persist change to localStorage cache
      return updatedPlayer;
    } catch (e) {
      console.error('[API]: ', e);
    }
  }

  async remove (playerId) {
    try {
      const player = await Model.InMemoryDataStore.delete(playerId, 'Player');
      this.push(); // persist change to localStorage cache
      return player;
    } catch (e) {
      console.error('[API]: ', e);
    }
  }
}