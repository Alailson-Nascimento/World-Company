import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly storageKey = 'world-company-reservas';

  private readonly reservas = signal<Reserva[]>(this.carregarReservas());

  getReservas(): Observable<Reserva[]> {
    return of(this.reservas());
  }

  getReservasPorPacote(pacoteId: number): Observable<Reserva[]> {
    return of(this.reservas().filter((reserva) => reserva.pacoteId === pacoteId));
  }

  criarReserva(reserva: Omit<Reserva, 'id'>): Observable<Reserva> {
    const novaReserva: Reserva = {
      ...reserva,
      id: this.gerarId(),
    };

    const novasReservas = [...this.reservas(), novaReserva];

    this.reservas.set(novasReservas);

    localStorage.setItem(this.storageKey, JSON.stringify(novasReservas));

    return of(novaReserva);
  }

  private carregarReservas(): Reserva[] {
    const reservasSalvas = localStorage.getItem(this.storageKey);

    if (!reservasSalvas) {
      return [];
    }

    try {
      return JSON.parse(reservasSalvas) as Reserva[];
    } catch {
      return [];
    }
  }

  private gerarId(): number {
    const reservasAtuais = this.reservas();

    if (reservasAtuais.length === 0) {
      return 1;
    }

    return Math.max(...reservasAtuais.map((reserva) => reserva.id)) + 1;
  }
}
