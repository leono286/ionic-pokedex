import { PokemonDetails } from './../../models/pokemon';
import { Action } from '@ngrx/store';

export enum PokemonActionTypes {
  LoadPokemons = '[Pokemon] Load pokemon batch',
  LoadPokemonsSuccess = '[Pokemon] Loaded pokemon batch successfully ',
}

export class LoadPokemons implements Action {
  readonly type = PokemonActionTypes.LoadPokemons;
}

export class LoadPokemonsSuccess implements Action {
  readonly type = PokemonActionTypes.LoadPokemonsSuccess;
  constructor( public payload: PokemonDetails[]) {}
}

export type PokemonActions = LoadPokemons | LoadPokemonsSuccess;
