import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Character } from '../interfaces/character.interface';
import { Filter } from '../interfaces/filter-character.interface';

@Injectable({providedIn: 'root'})
export class CharactersService {

  public basicUrl: string = 'https://rickandmortyapi.com/api/character';

  constructor( private http: HttpClient ) { }


  getCharacters(filter?: Filter): Observable<Character[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.name) {
        params = params.append('name', filter.name);
      }
      if (filter.status) {
        params = params.append('status', filter.status);
      }
      if (filter.species) {
        params = params.append('species', filter.species);
      }
      if (filter.gender) {
        params = params.append('gender', filter.gender);
      }
      // if (filter.origin) {
      //   params = params.append('origin', filter.origin);
      // }
    }

    return this.http.get<{ results: Character[] }>(this.basicUrl, { params })
      .pipe(
        map(response => {
          console.log('results: ', response);
          return response.results;
        }), // Obtener solo los datos dentro de "results" en la peticion
        catchError( error => {
          console.error('Error fetching characters:', error);
          return of([]) // Retorna una lista vacía en caso de error
        })
      );
  }
}
