import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PacoteDetalhe } from './pages/pacote-detalhe/pacote-detalhe';
import { Dashboard } from './pages/erp/dashboard/dashboard';
import { Alimentacao } from './pages/erp/alimentacao/alimentacao';
import { Funcionarios } from './pages/erp/funcionarios/funcionarios';
import { Operacao } from './pages/erp/operacao/operacao';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pacote/:id', component: PacoteDetalhe },
  { path: 'erp/dashboard', component: Dashboard },
  { path: 'erp/alimentacao', component: Alimentacao },
  { path: 'erp/funcionarios', component: Funcionarios },
  { path: 'erp/operacao', component: Operacao },
];
