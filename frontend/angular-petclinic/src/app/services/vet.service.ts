import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Specialty } from '../common/specialty';
import { Vet } from '../common/vet';

@Injectable({
  providedIn: 'root',
})
export class VetService {
  private baseUrl = 'http://localhost:8080/api/vets';

  constructor(private httpClient: HttpClient) {}

  getVet(vetId: number): Observable<Vet> {
    const vetUrl = `${this.baseUrl}/${vetId}`;

    return this.httpClient.get<Vet>(vetUrl);
  }

  getVetList(): Observable<Vet[]> {
    return this.httpClient
      .get<GetResponseVets>(this.baseUrl)
      .pipe(map((response) => response._embedded.vets));
  }

  getSpecialtiesByVetId(vetId: number): Observable<Specialty[]> {
    return this.httpClient
      .get<GetResponseSpecialties>(`${this.baseUrl}/${vetId}/specialties`)
      .pipe(map((response) => response._embedded.specialties));
  }
}

interface GetResponseVets {
  _embedded: {
    vets: Vet[];
  };
}

interface GetResponseSpecialties {
  _embedded: {
    specialties: Specialty[];
  };
}
