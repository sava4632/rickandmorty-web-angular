import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../interfaces/location.interface';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'location-detail-page',
  templateUrl: './location-detail-page.component.html',
  styleUrl: './location-detail-page.component.css'
})
export class LocationDetailPageComponent implements OnInit{

  public location?: Location;

  constructor ( private route: ActivatedRoute, private service: CharactersService ) {}

  ngOnInit(): void {
    const locationId = this.route.snapshot.paramMap.get('id');

    if (locationId) {
      this.service.getLocation( parseInt(locationId, 10) )
        .subscribe( location => {
          this.location = location;
        })
    }
  }
}
