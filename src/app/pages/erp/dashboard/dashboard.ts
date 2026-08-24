import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';

import { PacoteService } from '../../../services/pacote';
import { ReservaService } from '../../../services/reserva';
import { AlimentacaoService } from '../../../services/erp/alimentacao';
import { FuncionariosService } from '../../../services/erp/funcionarios';
import { OperacaoService } from '../../../services/erp/operacao';

import { Pacote } from '../../../models/pacote';
import { Reserva } from '../../../models/reserva';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly pacoteService = inject(PacoteService);
  private readonly reservaService = inject(ReservaService);
  private readonly alimentacaoService = inject(AlimentacaoService);
  private readonly funcionariosService = inject(FuncionariosService);
  private readonly operacaoService = inject(OperacaoService);

  private readonly canvasGrafico =
    viewChild<ElementRef<HTMLCanvasElement>>('graficoGastos');

  private grafico: Chart | undefined;

  protected readonly menuAberto = signal(false);

  protected readonly pacotes = signal<Pacote[]>([]);
  protected readonly reservas = signal<Reserva[]>([]);

  protected readonly totalAlimentacao = signal(0);
  protected readonly totalSalarios = signal(0);
  protected readonly totalOperacao = signal(0);

  protected readonly loading = signal(false);

  protected readonly totalPacotes = computed(() => this.pacotes().length);

  protected readonly totalReservas = computed(() => this.reservas().length);

  protected readonly receitaReservas = computed(() =>
    this.reservas().reduce((soma, reserva) => soma + reserva.valorTotal, 0),
  );

  protected readonly totalGastos = computed(
    () =>
      this.totalAlimentacao() +
      this.totalSalarios() +
      this.totalOperacao(),
  );

  protected readonly saldo = computed(
    () => this.receitaReservas() - this.totalGastos(),
  );

  constructor() {
    this.carregarTudo();

    effect(() => {
      const alimentacao = this.totalAlimentacao();
      const salarios = this.totalSalarios();
      const operacao = this.totalOperacao();
      const canvas = this.canvasGrafico();

      if (canvas && !this.loading()) {
        this.desenharGrafico(
          canvas.nativeElement,
          alimentacao,
          salarios,
          operacao,
        );
      }
    });
  }

  private carregarTudo(): void {
    this.loading.set(true);

    let carregamentosConcluidos = 0;
    const totalCarregamentos = 5;

    const finalizarCarregamento = (): void => {
      carregamentosConcluidos++;

      if (carregamentosConcluidos === totalCarregamentos) {
        this.loading.set(false);
      }
    };

    this.pacoteService.getPacotes().subscribe({
      next: (pacotes) => {
        this.pacotes.set(pacotes);
      },
      error: (erro) => {
        console.error('Erro ao carregar pacotes:', erro);
      },
      complete: finalizarCarregamento,
    });

    this.reservaService.getReservas().subscribe({
      next: (reservas) => {
        this.reservas.set(reservas);
      },
      error: (erro) => {
        console.error('Erro ao carregar reservas:', erro);
      },
      complete: finalizarCarregamento,
    });

    this.alimentacaoService.getGastos().subscribe({
      next: (gastos) => {
        this.totalAlimentacao.set(
          gastos.reduce((soma, gasto) => soma + gasto.valor, 0),
        );
      },
      error: (erro) => {
        console.error('Erro ao carregar gastos de alimentação:', erro);
      },
      complete: finalizarCarregamento,
    });

    this.funcionariosService.getFuncionarios().subscribe({
      next: (funcionarios) => {
        this.totalSalarios.set(
          funcionarios.reduce(
            (soma, funcionario) => soma + funcionario.salario,
            0,
          ),
        );
      },
      error: (erro) => {
        console.error('Erro ao carregar funcionários:', erro);
      },
      complete: finalizarCarregamento,
    });

    this.operacaoService.getGastos().subscribe({
      next: (gastos) => {
        this.totalOperacao.set(
          gastos.reduce((soma, gasto) => soma + gasto.valor, 0),
        );
      },
      error: (erro) => {
        console.error('Erro ao carregar gastos de operação:', erro);
      },
      complete: finalizarCarregamento,
    });
  }

  private desenharGrafico(
    canvas: HTMLCanvasElement,
    alimentacao: number,
    salarios: number,
    operacao: number,
  ): void {
    this.grafico?.destroy();

    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    this.grafico = new Chart(canvas, {
      type: 'bar',

      data: {
        labels: ['Alimentação', 'Funcionários', 'Operação'],

        datasets: [
          {
            label: 'Gastos por setor',
            data: [alimentacao, salarios, operacao],
            backgroundColor: ['#5c6bc0', '#26a69a', '#ef5350'],
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            callbacks: {
              label: (context) => {
                const valor = context.parsed.y ?? 0;

                return ` ${formatoMoeda.format(valor)}`;
              },
            },
          },
        },

        scales: {
          y: {
            ticks: {
              callback: (value) => formatoMoeda.format(Number(value)),
            },
          },
        },
      },
    });
  }
}
