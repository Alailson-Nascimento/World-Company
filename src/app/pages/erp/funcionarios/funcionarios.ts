import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FuncionariosService } from '../../../services/erp/funcionarios';
import { Funcionario } from '../../../models/funcionario';

@Component({
  selector: 'app-funcionarios',
  imports: [RouterLink],
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.scss',
})
export class Funcionarios {
  private readonly funcionariosService = inject(FuncionariosService);

  protected readonly funcionarios = signal<Funcionario[]>([]);
  protected readonly loading = signal(false);
  protected readonly erro = signal(false);
  protected readonly menuAberto = signal(false);

  protected readonly totalSalarios = computed(() => {
    const soma = this.funcionarios().reduce((acc, f) => acc + f.salario, 0);
    return Math.round(soma * 100) / 100; // ✅ arredonda para 2 casas
  });

  constructor() {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.loading.set(true);
    this.erro.set(false);

    this.funcionariosService.getFuncionarios().subscribe({
      next: (funcionarios) => {
        this.funcionarios.set(funcionarios);
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
