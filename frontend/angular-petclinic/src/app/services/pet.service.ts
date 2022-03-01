import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Owner } from '../common/owner';
import { Pet } from '../common/pet';
import { PetType } from '../common/pettype';
import { Visit } from '../common/visit';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private baseUrl = 'http://localhost:8080/api/pets';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  getPet(petId: number): Observable<Pet> {
    const petUrl = `${this.baseUrl}/${petId}`;

    return this.httpClient.get<Pet>(petUrl);
  }

  getOwnerByPetId(petId: number): Observable<Owner> {
    const petUrl = `${this.baseUrl}/${petId}/owner`;

    return this.httpClient.get<Owner>(petUrl);
  }

  getTypeByPetId(petId: number): Observable<PetType> {
    const petUrl = `${this.baseUrl}/${petId}/type`;

    return this.httpClient.get<PetType>(petUrl);
  }

  getVisitByPetId(petId: number): Observable<Visit[]> {
    const petUrl = `${this.baseUrl}/${petId}/visits`;

    return this.httpClient
      .get<GetResponseVisits>(petUrl)
      .pipe(map((response) => response._embedded.visits));
  }

  getPetList(): Observable<Pet[]> {
    return this.httpClient
      .get<GetResponsePets>(this.baseUrl)
      .pipe(map((response) => response._embedded.pets));
  }

  getPetTypeByPetId(petId: number): Observable<PetType> {
    return this.httpClient.get<PetType>(`${this.baseUrl}/${petId}/type`);
  }

  createPet(petPayload: Object): Observable<Object> {
    return this.httpClient.post<PetType>(`${this.baseUrl}`, petPayload, {
      headers: this.headers,
    });
  }

  updatePet(petPayload: Object, petId: number): Observable<Object> {
    console.log(`${this.baseUrl}/${petId}`);
    return this.httpClient.patch<PetType>(
      `${this.baseUrl}/${petId}`,
      petPayload,
      { headers: this.headers }
    );
  }

  deletePet(petId: number): Observable<Pet> {
    const petUrl = `${this.baseUrl}/${petId}`;

    return this.httpClient.delete<Pet>(petUrl);
  }
}

interface GetResponsePets {
  _embedded: {
    pets: Pet[];
  };
}

interface GetResponseVisits {
  _embedded: {
    visits: Visit[];
  };
}
