import React from 'react';
import { Machine, MachineConfig, assign } from 'xstate';
import { defaultMovies } from './movies.const';

const burgerMenuMachine: MachineConfig<any, any, any> = {
  initial: 'closed',
  states: {
    open: {
      on: {
        MENU_PRESS: 'closed',
        BACK_PRESS: 'closed',
        DOWNLOADS_PRESS: 'closed',
      },
    },
    closed: { on: { MENU_PRESS: 'open' } },
  },
};

const searchMachine: MachineConfig<any, any, any> = {
  initial: 'closed',
  states: {
    open: { on: { SEARCH_CANCEL: 'closed', BACK_PRESS: 'closed' } },
    closed: { on: { SEARCH_PRESS: 'open' } },
  },
};

const explorerMainMachine: MachineConfig<any, any, any> = {
  initial: 'home',
  states: {
    home: { on: { DOWNLOADS_PRESS: 'downloads' } },
    downloads: { on: { HOME_PRESS: 'home' } },
  },
};

const explorerMachine: MachineConfig<any, any, any> = {
  type: 'parallel',
  states: {
    burgerMenu: burgerMenuMachine,
    search: searchMachine,
    main: explorerMainMachine,
  },
};

const playerMachine: MachineConfig<any, any, any> = {
  initial: 'stopped',
  states: {
    stopped: {
      onEntry: [
        assign({
          currentMovieId: null,
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
