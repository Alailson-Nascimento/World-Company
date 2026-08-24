import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Setor } from '../../models/setor';

@Injectable({
  providedIn: 'root',
})
export class OperacaoService {
  private readonly http = inject(HttpClient);
  private readonly url = '/data/setores.json';
  private readonly categoriasOperacao = ['luz', 'agua', 'internet'];

  getGastos() {
    return this.http
      .get<Setor[]>(this.url)
      .pipe(map((setores) => setores.filter((s) => this.categoriasOperacao.includes(s.categoria))));
  }
}
