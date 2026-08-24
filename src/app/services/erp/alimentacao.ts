import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { Setor } from '../../models/setor';

@Injectable({
  providedIn: 'root',
})
export class AlimentacaoService {
  private readonly gastos: Setor[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    descricao: faker.food.dish(),
    categoria: 'ingredientes',
    valor: Number(
      faker.finance.amount({
        min: 200,
        max: 2000,
        dec: 2,
      }),
    ),
    data: faker.date
      .between({
        from: '2026-01-01',
        to: '2026-08-21',
      })
      .toISOString()
      .split('T')[0],
  }));

  getGastos() {
    return of(this.gastos);
  }
}
