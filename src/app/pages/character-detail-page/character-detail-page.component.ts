import { Component, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { Episode } from '../../interfaces/episode.interface';

@Component({
  selector: 'pages-character-detail-page',
  templateUrl: './character-detail-page.component.html',
  styleUrl: './character-detail-page.component.css'
})
export class CharacterDetailPageComponent implements OnInit {

  public character!: Character;
  public episodes: Episode[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const id = params['id'];
      this.loadCharacterDetails(id);
    });
  }

  private getEpisodesByUrl(episodes: string[]): void {
    this.charactersService.getEpisodesByUrl( episodes )
      .subscribe((data: Episode[]) => {
        this.episodes = data;
      });
  }

  loadCharacterDetails( id: number ): void {
    this.charactersService.getCharacterById( id )
      .subscribe( data => {
        this.character = data;

        // Obtener los episodios donde aparecio el personaje
        this.getEpisodesByUrl( this.character.episode );
      } )
  }

  goToLocation(url: string): void {
    const locationId = url.split('/').pop();
    if( locationId ) this.router.navigate(['/location', locationId]);
  }

  goToEpisode(episodeId: number): void {
    this.router.navigate(['/episode', episodeId]);
  }
}
