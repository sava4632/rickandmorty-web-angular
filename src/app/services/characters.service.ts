import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class CharactersService {

  public basicUrl: string = 'https://rickandmortyapi.com/api/character';

  constructor( private http: HttpClient ) { }


  getCharacter(): Observable<Character[]> {
    return this.http.get<{ results: Character[] }>( this.basicUrl )
    .pipe(
      map( respose => {
        console.log( 'results: ', respose);
        return respose.results;
      }) // Obtener solo los datos dentro de "results" en la peticion
    );
  }
}
