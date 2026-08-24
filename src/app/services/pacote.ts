import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Pacote } from '../models/pacote';

@Injectable({
  providedIn: 'root',
})
export class PacoteService {
  private readonly http = inject(HttpClient);
  private readonly url = '/data/pacotes.json';

  getPacotes() {
    return this.http.get<Pacote[]>(this.url);
  }

  getPacotePorId(id: number) {
    return this.http
      .get<Pacote[]>(this.url)
      .pipe(map((pacotes) => pacotes.find((p) => p.id === id) ?? null));
  }
}
