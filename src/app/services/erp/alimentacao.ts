import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Setor } from '../../models/setor';

@Injectable({
  providedIn: 'root',
})
export class AlimentacaoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/setores';

  getGastos() {
    return this.http.get<Setor[]>(`${this.apiUrl}?categoria=ingredientes`);
  }
}
