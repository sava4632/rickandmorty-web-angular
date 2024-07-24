import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'card-character',
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.css'
})
export class CardCharacterComponent {

  @Input()
  public character!: Character;

  constructor( private router: Router  ) {}

  goToDetails( characterId: number ): void{
    this.router.navigate(['/character', characterId]);
  }

  goToLocation(locationUrl: string) {
    const locationId = locationUrl.split('/').pop();
    if(locationId) this.router.navigate(['/location', locationId])
  }
}
