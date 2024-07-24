import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';
import { Filter } from '../../interfaces/filter-character.interface';
import { Info } from '../../interfaces/pagination-info.interface';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public characters: Character[] = [];
  public info?: Info;
  public filter: Filter = { name: '', status: '', species: '', gender: '' };
  public currentPage: number = 1;

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    // this.loadCharacters(this.currentPage);
    this.loadAllCharacters();
  }

  // loadCharacters(page: number): void {
  //   this.charactersService.getCharacters(this.filter, page)
  //     .subscribe( data => {
  //       this.characters = data.characters;
  //       this.info = data.info;
  //     });
  // }

  onFilter(): void {
    this.currentPage = 1;
    // this.loadCharacters(this.currentPage);
    this.loadAllCharacters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // this.loadCharacters(page);
  }

  loadAllCharacters(): void {
    this.charactersService.getAllCharacters(this.filter)
      .subscribe(data => {
        this.characters = data;
        // Actualiza la información si necesitas más detalles
        // this.info = ...; (esto podría no ser necesario si solo obtienes todos los personajes)
      });
  }
}
