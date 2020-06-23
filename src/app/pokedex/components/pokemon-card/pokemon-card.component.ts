import { ColorsPalette } from './../../../models/colorsPalette';
import { PokemonDetails } from './../../../models/pokemon';
import { Component, Input, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter } from '@angular/core';

const Vibrant = require('node-vibrant')

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnChanges {

  colorsPalette: ColorsPalette;

  @Input() pokemonData: PokemonDetails;
  @Output() openDetails = new EventEmitter<ColorsPalette>();

  constructor(private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('pokemonData') && changes.pokemonData) {
      Vibrant.from(this.pokemonData.sprites.front_default).getPalette((err, palette) => {
        this.colorsPalette = {
          lightVibrant: palette['LightVibrant']['hex'],
          darkMuted: palette['DarkMuted']['hex'],
        }
        this.setColorProperties();
      })
    }
  }

  setColorProperties() {
    (this.element.nativeElement as HTMLElement).style.setProperty('--lightVibrant', this.colorsPalette.lightVibrant);
    (this.element.nativeElement as HTMLElement).style.setProperty('--darkMuted', this.colorsPalette.darkMuted);
  }

  emitOpenDetails(): void {
    this.openDetails.emit(this.colorsPalette);
  }

  get pokemonTypes(): string[] {
    return this.pokemonData.types.map(type => type.type.name);
  }

}
