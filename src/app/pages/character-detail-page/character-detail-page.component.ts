import { Component, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'pages-character-detail-page',
  templateUrl: './character-detail-page.component.html',
  styleUrl: './character-detail-page.component.css'
})
export class CharacterDetailPageComponent implements OnInit {

  public character!: Character;

  constructor(private route: ActivatedRoute,
    private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const id = params['id'];
      this.loadCharacterDetails(id);
    })
  }

  loadCharacterDetails( id: number ): void {
    this.charactersService.getCharacterById( id )
      .subscribe( data => {
        this.character = data;
      } )
  }
}
