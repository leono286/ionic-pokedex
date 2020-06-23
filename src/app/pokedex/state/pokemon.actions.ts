import { PokemonDetails } from './../../models/pokemon';
import { Action } from '@ngrx/store';

export enum PokemonActionTypes {
  // SetCurrentProduct = '[Product] Set current product',
  // ClearCurrentProduct = '[Product] Clear current product',
  // InitializeCurrentProduct = '[Product] Initialize current product',
  LoadPokemons = '[Pokemon] Load pokemon batch',
  LoadPokemonsSuccess = '[Pokemon] Loaded pokemon batch successfully ',
  // LoadPokemonFail = '[Pokemon] Load pokemon batch failed',
  // UpdateProduct = '[Product] Update Product',
  // UpdateProductSuccess = '[Product] Updated Product successfully ',
  // UpdateProductFail = '[Product] Update Product failed',
  // CreateProduct = '[Product] Create Product',
  // CreateProductSuccess = '[Product] Created Product successfully ',
  // CreateProductFail = '[Product] Create Product failed',
  // DeleteProduct = '[Product] Delete Product',
  // DeleteProductSuccess = '[Product] Deleted Product successfully ',
  // DeleteProductFail = '[Product] Delete Product failed',
}

// export class ToggleProductCode implements Action {
//   readonly type = ProductActionTypes.ToggleProductCode;
//   constructor(public payload: boolean) { }
// }

// export class SetCurrentProduct implements Action {
//   readonly type = ProductActionTypes.SetCurrentProduct;
//   constructor(public payload: PokemonData) { }
// }

// export class ClearCurrentProduct implements Action {
//   readonly type = ProductActionTypes.ClearCurrentProduct;
// }

// export class InitializeCurrentProduct implements Action {
//   readonly type = ProductActionTypes.InitializeCurrentProduct;
// }

export class LoadPokemons implements Action {
  readonly type = PokemonActionTypes.LoadPokemons;
}

export class LoadPokemonsSuccess implements Action {
  readonly type = PokemonActionTypes.LoadPokemonsSuccess;
  constructor( public payload: PokemonDetails[]) {}
}

// export class LoadPokemonFail implements Action {
//   readonly type = PokemonActionTypes.LoadPokemonFail;
//   constructor( public payload: string) {}
// }

// export class UpdateProduct implements Action {
//   readonly type = ProductActionTypes.UpdateProduct;
//   constructor( public payload: PokemonData) {}
// }

// export class UpdateProductSuccess implements Action {
//   readonly type = ProductActionTypes.UpdateProductSuccess;
//   constructor( public payload: PokemonData) {}
// }

// export class UpdateProductFail implements Action {
//   readonly type = ProductActionTypes.UpdateProductFail;
//   constructor( public payload: string) {}
// }

// export class CreateProduct implements Action {
//   readonly type = ProductActionTypes.CreateProduct;
//   constructor( public payload: PokemonData) {}
// }

// export class CreateProductSuccess implements Action {
//   readonly type = ProductActionTypes.CreateProductSuccess;
//   constructor( public payload: PokemonData) {}
// }

// export class CreateProductFail implements Action {
//   readonly type = ProductActionTypes.CreateProductFail;
//   constructor( public payload: string) {}
// }

// export class DeleteProduct implements Action {
//   readonly type = ProductActionTypes.DeleteProduct;
//   constructor( public payload: number) {}
// }

// export class DeleteProductSuccess implements Action {
//   readonly type = ProductActionTypes.DeleteProductSuccess;
//   constructor( public payload: number ) {}
// }

// export class DeleteProductFail implements Action {
//   readonly type = ProductActionTypes.DeleteProductFail;
//   constructor( public payload: string) {}
// }

export type PokemonActions = LoadPokemons | LoadPokemonsSuccess;
