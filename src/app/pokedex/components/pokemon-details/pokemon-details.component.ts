import { ColorsPalette } from './../../../models/colorsPalette';
import { PokemonDetails } from './../../../models/pokemon';
import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements AfterViewInit {

  @Input() pokemonData: PokemonDetails;
  @Input() colorsPalette: ColorsPalette;

  constructor(
    private element: ElementRef,
    public modalController: ModalController,
  ) { }

  ngAfterViewInit(): void {
    this.setColorProperties();
  }

  setColorProperties() {
    (this.element.nativeElement as HTMLElement).style.setProperty('--lightVibrant', this.colorsPalette.lightVibrant);
    (this.element.nativeElement as HTMLElement).style.setProperty('--darkMuted', this.colorsPalette.darkMuted);
  }

  get pokemonTypes(): string[] {
    return this.pokemonData.types.map(type => type.type.name);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
