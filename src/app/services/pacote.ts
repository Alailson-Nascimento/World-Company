import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pacote } from '../models/pacote';

@Injectable({
  providedIn: 'root',
})
export class PacoteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/pacotes';

  getPacotes() {
    return this.http.get<Pacote[]>(this.apiUrl);
  }

  getPacotePorId(id: number) {
    return this.http.get<Pacote>(`${this.apiUrl}/${id}`);
  }
}
