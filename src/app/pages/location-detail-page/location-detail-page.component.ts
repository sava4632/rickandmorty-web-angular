import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../interfaces/location.interface';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'location-detail-page',
  templateUrl: './location-detail-page.component.html',
  styleUrl: './location-detail-page.component.css'
})
export class LocationDetailPageComponent implements OnInit{

  public residents: Character[] = [];
  public location?: Location;

  constructor ( private route: ActivatedRoute, private router: Router, private service: CharactersService ) {}

  ngOnInit(): void {
    const locationId = this.route.snapshot.paramMap.get('id');

    if (locationId) {
      this.service.getLocation( parseInt(locationId, 10) )
        .subscribe( location => {
          this.location = location;

          // obtener los personajes residentes
          this.getResidents( this.location.residents );
        })
    }
  }

  private getResidents( residentsUrls: string[] ) {
    this.service.getCharactersByUrl( residentsUrls )
      .subscribe(( data: Character[] ) => {
        this.residents = data;
      })
  }

  goToCharacter(residentId: number) {
    if(residentId) {
      this.router.navigate(['/character', residentId]);
    }
  }
}


