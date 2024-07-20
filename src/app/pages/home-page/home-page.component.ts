import { Component, OnInit } from '@angular/core';

import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';
import { Filter } from '../../interfaces/filter-character.interface';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public characters: Character[] = [];
  public filter: Filter = { name: '', status: '', species: '', gender: ''};

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.charactersService.getCharacters()
      .subscribe((data: Character[]) => {
        this.characters = data;
        console.log('Lista de personajes: ', this.characters);
      });
  }

  onFilter(): void {
    this.charactersService.getCharacters(this.filter)
      .subscribe((data: Character[]) => {
        console.log('Lista de personajes (filtrados): ', this.characters);
        this.characters = data;
      })
  }
}
