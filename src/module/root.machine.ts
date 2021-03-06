import React from 'react';
import { Machine, MachineConfig, assign } from 'xstate';
import { defaultMovies } from './movies.const';
import { connectivityService } from './connectivity.service';

const searchMachine: MachineConfig<any, any, any> = {
  initial: 'closed',
  states: {
    open: { on: { SEARCH_CANCEL: 'closed', BACK_PRESS: 'closed' } },
    closed: { on: { SEARCH_PRESS: 'open' } },
  },
};

const explorerMainMachine: MachineConfig<any, any, any> = {
  initial: 'home',
  invoke: {
    id: 'explorer-connectivity',
    src: connectivityService,
  },
  states: {
    home: {
      on: { DOWNLOADS_PRESS: 'downloads', NETWORK_DISCONNECT: 'downloads' },
    },
    downloads: { on: { HOME_PRESS: 'home' } },
  },
};

const explorerMachine: MachineConfig<any, any, any> = {
  type: 'parallel',
  states: {
    search: searchMachine,
    main: explorerMainMachine,
  },
};

const playerMachine: MachineConfig<any, any, any> = {
  initial: 'stopped',
  invoke: {
    id: 'player_connectivity',
    src: connectivityService,
  },
  states: {
    stopped: {
      onEntry: [
        assign({
          currentMovie: null,
        }),
      ],
      on: {
        MOVIE_PLAY: 'playing',
      },
    },
    playing: {
      onEntry: [
        assign((context, event) => ({
          currentMovie: event.movie,
        })),
      ],
      initial: 'maximized',
      states: {
        maximized: {},
        minimized: {},
      },
      on: {
        MOVIE_STOP: 'stopped',
        NETWORK_DISCONNECT: [
          {
            cond: (ctx, e) => !ctx.currentMovie.downloaded,
            target: 'stopped',
            actions: [() => alert("You've been disconnected")],
          },
        ],
      },
    },
  },
};

const libraryMachine: MachineConfig<any, any, any> = {
  initial: 'hydrating',
  context: {
    movies: [],
  },
  states: {
    hydrating: {
      onEntry: [
        assign({
          movies: defaultMovies,
        }),
      ],
      always: 'iddle',
    },
    iddle: {},
  },
};

export const rootMachine = Machine({
  id: 'root',
  type: 'parallel',
  states: {
    explorer: explorerMachine,
    player: playerMachine,
    library: libraryMachine,
  },
});

export const RootMachineProvider = React.createContext(null);
