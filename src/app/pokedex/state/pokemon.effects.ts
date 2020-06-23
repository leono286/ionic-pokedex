import { PokeApiService } from "./../services/poke-api.service";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as pokemonActions from './pokemon.actions'
import { PokemonDetails } from "./../../models/pokemon";
import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class PokemonEffects {

  constructor(
    private actions$: Actions,
    private pokeApiService: PokeApiService
  ) { }

  @Effect()
  loadPokemons$: Observable<Action> = this.actions$.pipe(
    ofType(pokemonActions.PokemonActionTypes.LoadPokemons),
    mergeMap(() => this.pokeApiService.getPokemons().pipe(
      map((pokemonList: PokemonDetails[]) => new pokemonActions.LoadPokemonsSuccess(pokemonList)),
      )
    )
  );
}
