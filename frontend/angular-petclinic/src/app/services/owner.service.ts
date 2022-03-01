import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Owner } from '../common/owner';
import { Pet } from '../common/pet';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private baseUrl = 'http://localhost:8080/api/owners';

  constructor(private httpClient: HttpClient) {}

  getOwner(ownerId: number): Observable<Owner> {
    const ownerUrl = `${this.baseUrl}/${ownerId}`;

    return this.httpClient.get<Owner>(ownerUrl);
  }

  getOwnerList(): Observable<Owner[]> {
    return this.httpClient
      .get<GetResponseOwners>(this.baseUrl)
      .pipe(map((response) => response._embedded.owners));
  }

  getPetsByOwnerId(ownerId: number): Observable<Pet[]> {
    return this.httpClient
      .get<GetResponsePets>(`${this.baseUrl}/${ownerId}/pets`)
      .pipe(map((response) => response._embedded.pets));
  }

  createOwner(owner: Owner): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, owner);
  }

  updateOwner(ownerId: number, owner: Owner): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${ownerId}`, owner);
  }
}

interface GetResponseOwners {
  _embedded: {
    owners: Owner[];
  };
}

interface GetResponsePets {
  _embedded: {
    pets: Pet[];
  };
}
