import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, forkJoin, map, Observable, of } from 'rxjs';
import { Character } from '../interfaces/character.interface';
import { Filter } from '../interfaces/filter-character.interface';
import { Info } from '../interfaces/pagination-info.interface';
import { Location } from '../interfaces/location.interface';

@Injectable({ providedIn: 'root' })
export class CharactersService {

  public basicUrl: string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters(filter?: Filter, page: number = 1): Observable<any> {
    let params = new HttpParams();

    if (filter) {
      if (filter.name) params = params.append('name', filter.name);
      if (filter.status) params = params.append('status', filter.status);
      if (filter.species) params = params.append('species', filter.species);
      if (filter.gender) params = params.append('gender', filter.gender);
    }
    params = params.append('page', page.toString());

    return this.http.get<{ info: Info, results: Character[] }>(this.basicUrl, { params })
      .pipe(
        map(response => ({
          characters: response.results,
          info: response.info
        })),
        catchError(error => {
          console.error('Error fetching characters:', error);
          return of({
            characters: [], info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null
            }
          }); // Retorna una lista vacía en caso de error
        })
      );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.basicUrl}/${id}`);
  }

  getAllCharacters(filter?: Filter): Observable<Character[]> {
    // Empezamos con la primera página
    return this.getCharacters(filter, 1).pipe(
      // Empleamos concat para unir los resultados de todas las páginas
      concatMap(response => this.getAllCharactersFromResponse(response, filter))
    );
  }

  private getAllCharactersFromResponse(response: { characters: Character[], info: Info }, filter?: Filter): Observable<Character[]> {
    const { characters, info } = response;

    if (!info.next) {
      // Si no hay más páginas, devolvemos los personajes obtenidos
      return of(characters);
    }

    // Si hay más páginas, obtenemos la siguiente página y concatenamos los resultados
    return this.getCharacters(filter, this.getNextPage(info.next)).pipe(
      concatMap(nextResponse => this.getAllCharactersFromResponse({
        characters: [...characters, ...nextResponse.characters],
        info: nextResponse.info
      }, filter))
    );
  }

  private getNextPage(nextUrl: string): number {
    const url = new URL(nextUrl);
    return parseInt(url.searchParams.get('page') || '1', 10);
  }

  getLocation( id: number ): Observable<Location> {
    const url = 'https://rickandmortyapi.com/api/location';
    return this.http.get<Location>( `${url}/${id}` );
  }

  getCharactersByUrl( residentsUrls: string[] ): Observable<Character[]> {
    const requests: Observable<Character>[] = residentsUrls.map(url => this.http.get<Character>(url));
    return forkJoin(requests);
  }

}

