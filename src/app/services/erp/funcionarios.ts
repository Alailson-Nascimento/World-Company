import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { Funcionario } from '../../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  private readonly funcionarios: Funcionario[] = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    nome: faker.person.fullName(),
    cargo: faker.person.jobTitle(),
    salario: Number(
      faker.finance.amount({
        min: 1500,
        max: 2500,
        dec: 2,
      }),
    ),
  }));

  getFuncionarios() {
    return of(this.funcionarios);
  }
}
