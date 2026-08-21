export interface Reserva {
  id: number;
  pacoteId: number;
  dataInicio: string;
  dataFim: string;
  quantidadeDias: number;
  valorTotal: number;
  nomeCliente: string;
}
