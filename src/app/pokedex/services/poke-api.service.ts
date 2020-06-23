import { PokemonDetails, PokeApiResponse } from './../../models/pokemon';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, concatMap, mergeMap, catchError } from "rxjs/operators";

@Injectable()
export class PokeApiService {

  readonly POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';
  currentOffset = 0;
  totalCount: number;
  requestSize = 50;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getPokemons(): Observable<(PokemonDetails | string)[]> {
    return this.httpClient.get<PokeApiResponse>(this.createRequestUrl()).pipe(
      tap(() => {
        this.currentOffset += this.requestSize;
      }),
      mergeMap((response: PokeApiResponse) => {
        return forkJoin(  
          response.results.map(pokemon => this.getPokemonDetails(pokemon.url))
        );
      })
    );
  }

  createRequestUrl(): string {
    return `${this.POKEAPI_URL}?offset=${this.currentOffset}&limit=${this.requestSize}`;
  }

  getPokemonDetails(url: string): Observable<PokemonDetails | string> {
    return this.httpClient.get<PokemonDetails | string>(url).pipe(
      catchError(err => of('error loading ' + url))
    )
  }

}
