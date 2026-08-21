import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/funcionarios';

  getFuncionarios() {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }
}
