import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PetType } from '../common/pettype';

@Injectable({
  providedIn: 'root',
})
export class PetTypeService {
  private baseUrl = 'http://localhost:8080/api/types';

  constructor(private httpClient: HttpClient) {}

  getPetType(petTypeId: number): Observable<PetType> {
    const petTypeUrl = `${this.baseUrl}/${petTypeId}`;
    
    return this.httpClient.get<PetType>(petTypeUrl);
  };

  getPetTypeList(): Observable<PetType[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.types)
    );
  }
}

interface GetResponse {
  _embedded: {
    types: PetType[];
  };
}
