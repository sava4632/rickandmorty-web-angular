import { Component, OnInit } from '@angular/core';

import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public characters: Character[] = [];

  constructor( private charactersService: CharactersService ){}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.charactersService.getCharacter()
      .subscribe(( data: Character[] ) => {
        this.characters = data;
        console.log('Lista de personajes: ', this.characters);
      });
  }

  onFilter(){

  }


}
