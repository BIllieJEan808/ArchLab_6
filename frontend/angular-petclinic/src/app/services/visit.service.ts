import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit } from '../common/visit';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private baseUrl = 'http://localhost:8080/api/visits';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  getVisit(visitId: number): Observable<Visit> {
    const visitUrl = `${this.baseUrl}/${visitId}`;
    return this.httpClient.get<Visit>(visitUrl);
  }

  createService(visitPayload: Object): Observable<Object> {
    return this.httpClient.post<Visit>(`${this.baseUrl}`, visitPayload, {
      headers: this.headers,
    });
  }
}

interface GetResponse {
  _embedded: {
    visits: Visit[];
  };
}
