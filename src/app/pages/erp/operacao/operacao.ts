import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OperacaoService } from '../../../services/erp/operacao';
import { Setor } from '../../../models/setor';

@Component({
  selector: 'app-operacao',
  imports: [RouterLink],
  templateUrl: './operacao.html',
  styleUrl: './operacao.scss',
})
export class Operacao {
  private readonly operacaoService = inject(OperacaoService);

  protected readonly gastos = signal<Setor[]>([]);
  protected readonly loading = signal(false);
  protected readonly erro = signal(false);
  protected readonly menuAberto = signal(false);
  protected readonly totalGasto = computed(() =>
    this.gastos().reduce((soma, item) => soma + item.valor, 0),
  );

  constructor() {
    this.carregarGastos();
  }

  carregarGastos() {
    this.loading.set(true);
    this.erro.set(false);

    this.operacaoService.getGastos().subscribe({
      next: (gastos) => {
        this.gastos.set(gastos);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.erro.set(true);
        this.loading.set(false);
      },
    });
  }
}
