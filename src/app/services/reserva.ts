import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/reservas';

  getReservas() {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  getReservasPorPacote(pacoteId: number) {
    return this.http.get<Reserva[]>(`${this.apiUrl}?pacoteId=${pacoteId}`);
  }

  criarReserva(reserva: Omit<Reserva, 'id'>) {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }
}
