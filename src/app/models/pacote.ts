export interface Pacote {
  id: number;
  destino: string;
  descricao: string;
  precoPorDia: number;
  imagemUrl: string;
  temRestaurante: boolean;
  cardapio?: string;
  faq: { pergunta: string; resposta: string }[];
}
