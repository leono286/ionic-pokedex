import { ColorsPalette } from './../models/colorsPalette';
import { Router } from '@angular/router';
import { LogoutUser } from './../auth/login/state/login.actions';
import { LoadPokemons } from './state/pokemon.actions';
import { State } from './state/pokemon.reducer';
import { PokemonDetails } from './../models/pokemon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as pokemonSelectors from './state/pokemon.selectors'
import { IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { Plugins } from '@capacitor/core';

const { Keyboard } = Plugins;


@Component({
  selector: 'app-pokedex',
  templateUrl: 'pokedex.page.html',
  styleUrls: ['pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  pokemonsList: PokemonDetails[];
  pokemonsToShow: PokemonDetails[] = [];
  lastSearch = '';
  showPokemonSearchBar = false;

  @ViewChild('infiteScroll', { static: true }) infinteScroll: IonInfiniteScroll;

  constructor(
    private store: Store<State>,
    private router: Router,
    public modalController: ModalController,
    public platform: Platform
  ) { }


  ngOnInit(): void {
    this.store.dispatch(new LoadPokemons());
    this.store.pipe(select(pokemonSelectors.getPokemonsList)).subscribe((pokemonList: PokemonDetails[]) => {
      this.infinteScroll.complete();
      this.pokemonsList = pokemonList;
      this.pokemonsToShow = [...this.pokemonsList];
    });
  }

  enterKeyPressed() {
    if (this.platform.is('mobile')) {
      Keyboard.hide();
    }
  }

  loadData(): void {
    this.store.dispatch(new LoadPokemons());
  }

  async openDetails(colorsPalette: ColorsPalette, pokemonData: PokemonDetails): Promise<void> {
    const modal = await this.modalController.create({
      component: PokemonDetailsComponent,
      componentProps: {
        'pokemonData': pokemonData,
        'colorsPalette': colorsPalette,
      }
    });
    return await modal.present();
  }

  onSearchChange(event: CustomEvent) {
    if (event.detail.value !== '') {
      this.filterPokemonsToShow(event.detail.value);
    }
  }

  onSearchClear() {
    this.pokemonsToShow = [...this.pokemonsList]
  }

  togglePokemonSearchBar(): void {
    this.showPokemonSearchBar = !this.showPokemonSearchBar;
    if (!this.showPokemonSearchBar) {
      this.onSearchClear();
    }
  }

  filterPokemonsToShow(filterString: string): void {
    let pokemonsToFilter: PokemonDetails[];
    if (this.lastSearch && filterString.indexOf(this.lastSearch) === 0) {
      pokemonsToFilter = [...this.pokemonsToShow];
    } else {
      pokemonsToFilter = [...this.pokemonsList]
    }
    const regExp = new RegExp(filterString.toLocaleLowerCase());
    this.pokemonsToShow = pokemonsToFilter.filter(pokemonData => {
      let matches = pokemonData.name.toLocaleLowerCase().match(regExp);
      matches = matches || pokemonData.types.map(type => type.type.name).join('|').match(regExp);
      return matches;
    });
    this.lastSearch = filterString;
  }

  logout(): void {
    this.store.dispatch(new LogoutUser());
    this.router.navigate(['/login']);
  }

}
