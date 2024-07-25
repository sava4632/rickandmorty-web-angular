import { Component, OnInit } from '@angular/core';
import { Episode } from '../../interfaces/episode.interface';
import { Character } from '../../interfaces/character.interface';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'episode-detail-page',
  templateUrl: './episode-detail-page.component.html',
  styleUrl: './episode-detail-page.component.css'
})
export class EpisodeDetailPageComponent implements OnInit {

  public episode?: Episode;
  public characters: Character[] = [];

  constructor ( private service: CharactersService, private route: ActivatedRoute, private router: Router ) {}

  ngOnInit(): void {
    const episodeId = this.route.snapshot.paramMap.get('id');
    if( episodeId ) this.service.getEpisodeById( parseInt(episodeId,10))
      .subscribe( episode => {
        this.episode = episode;

        // Obtener los personajes del episodio
        this.getCharactersByUrls( episode.characters );
      })
  }

  private getCharactersByUrls(charactersUrls: string[]) {
    this.service.getCharactersByUrl(charactersUrls)
      .subscribe( (data: Character[]) => {
        this.characters = data;
      })
  }

  goToCharacter(characterId: number) {
    if(characterId) this.router.navigate(['/character', characterId]);
  }
}
