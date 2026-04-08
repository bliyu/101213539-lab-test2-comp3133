import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class HarryPotterService {
  private http = inject(HttpClient);
  private baseUrl = 'https://hp-api.onrender.com/api';

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/house/${encodeURIComponent(house)}`);
  }

  getCharacterById(id: string): Observable<Character> {
    return this.http
      .get<Character[] | Character>(`${this.baseUrl}/character/${id}`)
      .pipe(
        map((response) => Array.isArray(response) ? response[0] : response)
      );
  }
}
