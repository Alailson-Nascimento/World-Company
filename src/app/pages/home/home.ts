import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacoteService } from '../../services/pacote';
import { Pacote } from '../../models/pacote';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly pacoteService = inject(PacoteService);

  protected readonly pacotes = signal<Pacote[]>([]);
  protected readonly loading = signal(false);
  protected readonly erro = signal(false);

  constructor() {
    this.carregarPacotes();
  }

  carregarPacotes() {
    this.loading.set(true);
    this.erro.set(false);

    this.pacoteService.getPacotes().subscribe({
      next: (pacotes) => {
        this.pacotes.set(pacotes);
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
