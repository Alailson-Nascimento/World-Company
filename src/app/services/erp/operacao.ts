import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { Setor } from '../../models/setor';

@Injectable({
  providedIn: 'root',
})
export class OperacaoService {
  private readonly categoriasOperacao = ['luz', 'agua', 'internet'];

  private readonly gastos: Setor[] = this.categoriasOperacao.map((categoria, index) => ({
    id: index + 1,
    descricao: this.getDescricao(categoria),
    categoria,
    valor: Number(
      faker.finance.amount({
        min: 300,
        max: 2500,
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
    return of(this.gastos.filter((setor) => this.categoriasOperacao.includes(setor.categoria)));
  }

  private getDescricao(categoria: string): string {
    const descricoes: Record<string, string> = {
      luz: 'Conta de energia elétrica',
      agua: 'Conta de água',
      internet: 'Internet',
    };

    return descricoes[categoria] ?? 'Despesa operacional';
  }
}
