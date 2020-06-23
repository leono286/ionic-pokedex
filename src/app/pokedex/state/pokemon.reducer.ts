import { PokemonDetails } from './../../models/pokemon';
import * as fromRoot from "./../../state";
import { PokemonActions, PokemonActionTypes, LoadPokemonsSuccess } from './pokemon.actions';


export interface State extends fromRoot.State  {
  pokemons: PokemonsState,
};

export interface PokemonsState {
  pokemons: PokemonDetails[],
}

const initialState: PokemonsState = {
  pokemons: [],
};

export function reducer(state = initialState, action: PokemonActions): PokemonsState {
  switch (action.type) {

    case PokemonActionTypes.LoadPokemonsSuccess:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };

    default:
      return state;
  }
}
