import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PacoteService } from '../../services/pacote';
import { ReservaService } from '../../services/reserva';
import { Pacote } from '../../models/pacote';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-pacote-detalhe',
  imports: [RouterLink],
  templateUrl: './pacote-detalhe.html',
  styleUrl: './pacote-detalhe.scss',
})
export class PacoteDetalhe {
  private readonly route = inject(ActivatedRoute);
  private readonly pacoteService = inject(PacoteService);
  private readonly reservaService = inject(ReservaService);

  protected readonly pacote = signal<Pacote | null>(null);
  protected readonly reservasExistentes = signal<Reserva[]>([]);
  protected readonly loading = signal(false);
  protected readonly erro = signal(false);

  protected readonly nomeCliente = signal('');
  protected readonly dataInicio = signal('');
  protected readonly dataFim = signal('');
  protected readonly mensagemReserva = signal('');

  protected readonly valorTotal = computed(() => {
    const pacoteAtual = this.pacote();
    const inicio = this.dataInicio();
    const fim = this.dataFim();
    if (!pacoteAtual || !inicio || !fim) return 0;

    const dias = this.calcularDias(inicio, fim);
    return dias > 0 ? dias * pacoteAtual.precoPorDia : 0;
  });

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarPacote(id);
    this.carregarReservas(id);
  }

  carregarPacote(id: number) {
    this.loading.set(true);
    this.erro.set(false);

    this.pacoteService.getPacotePorId(id).subscribe({
      next: (pacote) => {
        this.pacote.set(pacote);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.erro.set(true);
        this.loading.set(false);
      },
    });
  }

  carregarReservas(id: number) {
    this.reservaService.getReservasPorPacote(id).subscribe({
      next: (reservas) => this.reservasExistentes.set(reservas),
    });
  }

  calcularDias(inicio: string, fim: string): number {
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    const diffMs = dataFim.getTime() - dataInicio.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  datasConflitam(inicio: string, fim: string): boolean {
    const novaInicio = new Date(inicio).getTime();
    const novaFim = new Date(fim).getTime();

    return this.reservasExistentes().some((reserva) => {
      const existenteInicio = new Date(reserva.dataInicio).getTime();
      const existenteFim = new Date(reserva.dataFim).getTime();
      return novaInicio <= existenteFim && novaFim >= existenteInicio;
    });
  }

  confirmarReserva() {
    const pacoteAtual = this.pacote();
    const inicio = this.dataInicio();
    const fim = this.dataFim();
    const nome = this.nomeCliente();

    if (!pacoteAtual || !inicio || !fim || !nome) {
      this.mensagemReserva.set('Preencha todos os campos.');
      return;
    }

    if (this.calcularDias(inicio, fim) <= 0) {
      this.mensagemReserva.set('A data final deve ser depois da inicial.');
      return;
    }

    if (this.datasConflitam(inicio, fim)) {
      this.mensagemReserva.set('Já existe uma reserva nessas datas.');
      return;
    }

    const novaReserva: Omit<Reserva, 'id'> = {
      pacoteId: pacoteAtual.id,
      dataInicio: inicio,
      dataFim: fim,
      quantidadeDias: this.calcularDias(inicio, fim),
      valorTotal: this.valorTotal(),
      nomeCliente: nome,
    };

    this.reservaService.criarReserva(novaReserva).subscribe({
      next: () => {
        this.mensagemReserva.set('Reserva confirmada com sucesso!');
        this.carregarReservas(pacoteAtual.id);
      },
      error: (err) => {
        console.error(err);
        this.mensagemReserva.set('Erro ao confirmar reserva.');
      },
    });
  }
}
