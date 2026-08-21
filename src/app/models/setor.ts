export interface Setor {
  id: number;
  descricao: string;
  categoria: string; // 'ingredientes' | 'luz' | 'agua' | 'internet'
  valor: number;
  data: string; // 'YYYY-MM-DD'
}
