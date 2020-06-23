import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PokemonsState } from './pokemon.reducer';

const getPokemonFeatureState = createFeatureSelector<PokemonsState>('pokemons');

export const getPokemonsList = createSelector(
  getPokemonFeatureState,
  pokemonState => {
    return pokemonState.pokemons
  },
);