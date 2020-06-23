import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PokedexPageRoutingModule } from './pokedex-routing.module';
import { PokedexPage } from './pokedex.page';

import { PokeApiService } from './services/poke-api.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonEffects } from './state/pokemon.effects';
import { reducer } from './state/pokemon.reducer';
import { AuthGuard } from './auth.guard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokedexPageRoutingModule,
    StoreModule.forFeature('pokemons', reducer),
    EffectsModule.forFeature([PokemonEffects]),
  ],
  providers: [
    PokeApiService,
    AuthGuard
  ],
  declarations: [
    PokedexPage,
    PokemonCardComponent,
    PokemonDetailsComponent,
  ]
})
export class PokedexPageModule {}
