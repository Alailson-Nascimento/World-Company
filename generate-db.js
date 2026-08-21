import { fakerPT_BR as faker } from '@faker-js/faker';
import fs from 'fs';

const itensSetor = [
  { descricao: 'Compra de ingredientes para o restaurante', categoria: 'ingredientes' },
  { descricao: 'Reposição de estoque da cozinha', categoria: 'ingredientes' },
  { descricao: 'Conta de energia elétrica do mês', categoria: 'luz' },
  { descricao: 'Fatura de energia elétrica', categoria: 'luz' },
  { descricao: 'Conta de água do estabelecimento', categoria: 'agua' },
  { descricao: 'Fatura de saneamento e água', categoria: 'agua' },
  { descricao: 'Fatura de internet e telefonia', categoria: 'internet' },
  { descricao: 'Plano de internet corporativo', categoria: 'internet' }
];
const pacotes = [
  {
    id: 1,
    destino: 'Paris, França',
    descricao:
      'Conheça a Torre Eiffel, o Museu do Louvre e as charmosas ruas de Montmartre nessa experiência inesquecível pela capital francesa.',
    precoPorDia: 650,
    imagemUrl: 'https://loremflickr.com/800/600/paris,eiffel',
    temRestaurante: true,
    cardapio: 'Culinária francesa autêntica com croissants, queijos finos e vinhos selecionados.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Sim, cancelamentos com até 7 dias de antecedência têm reembolso integral.',
      },
      { pergunta: 'Inclui café da manhã?', resposta: 'Sim, servido diariamente das 7h às 10h30.' },
    ],
  },
  {
    id: 2,
    destino: 'Rio de Janeiro, Brasil',
    descricao:
      'Praias paradisíacas, o Cristo Redentor e a vibrante cultura carioca esperam por você numa das cidades mais icônicas do mundo.',
    precoPorDia: 420,
    imagemUrl: 'https://loremflickr.com/800/600/riodejaneiro,beach',
    temRestaurante: true,
    cardapio: 'Feijoada completa, churrasco brasileiro e frutos do mar frescos.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Cancelamentos são permitidos com até 48 horas de antecedência.',
      },
      {
        pergunta: 'Inclui café da manhã?',
        resposta: 'O café da manhã é opcional e pode ser adicionado à reserva.',
      },
    ],
  },
  {
    id: 3,
    destino: 'Santorini, Grécia',
    descricao:
      'Casinhas brancas com cúpulas azuis, pôr do sol espetacular e águas cristalinas num dos destinos mais fotografados do Mediterrâneo.',
    precoPorDia: 780,
    imagemUrl: 'https://loremflickr.com/800/600/santorini,greece',
    temRestaurante: false,
    cardapio: 'Culinária mediterrânea com frutos do mar, azeite extra virgem e queijos locais.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Sim, basta entrar em contato com nossa central de atendimento.',
      },
      {
        pergunta: 'Inclui café da manhã?',
        resposta: 'Sim, o café da manhã está incluso em todas as diárias.',
      },
    ],
  },
  {
    id: 4,
    destino: 'Tóquio, Japão',
    descricao:
      'Tradição milenar encontra tecnologia de ponta nas ruas movimentadas de uma das metrópoles mais fascinantes da Ásia.',
    precoPorDia: 590,
    imagemUrl: 'https://loremflickr.com/800/600/tokyo,japan',
    temRestaurante: true,
    cardapio: 'Culinária japonesa autêntica, incluindo sushi, ramen e pratos tradicionais.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Sim, cancelamentos com até 7 dias de antecedência têm reembolso integral.',
      },
      { pergunta: 'Inclui café da manhã?', resposta: 'Sim, servido diariamente das 7h às 10h30.' },
    ],
  },
  {
    id: 5,
    destino: 'Cusco, Peru',
    descricao:
      'Porta de entrada para Machu Picchu, com rica história inca, arquitetura colonial e paisagens andinas de tirar o fôlego.',
    precoPorDia: 340,
    imagemUrl: 'https://loremflickr.com/800/600/cusco,peru',
    temRestaurante: false,
    cardapio: 'Culinária peruana com pratos típicos andinos e ingredientes locais.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Cancelamentos são permitidos com até 48 horas de antecedência.',
      },
      {
        pergunta: 'Inclui café da manhã?',
        resposta: 'O café da manhã é opcional e pode ser adicionado à reserva.',
      },
    ],
  },
  {
    id: 6,
    destino: 'Bali, Indonésia',
    descricao:
      'Templos milenares, praias tropicais e terraços de arroz verdejantes num paraíso perfeito para relaxar e se reconectar.',
    precoPorDia: 380,
    imagemUrl: 'https://loremflickr.com/800/600/bali,temple',
    temRestaurante: true,
    cardapio: 'Culinária indonésia com pratos apimentados, frutas tropicais e frutos do mar.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Sim, basta entrar em contato com nossa central de atendimento.',
      },
      {
        pergunta: 'Inclui café da manhã?',
        resposta: 'Sim, o café da manhã está incluso em todas as diárias.',
      },
    ],
  },
];

const funcionarios = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  nome: faker.person.fullName(),
  cargo: faker.person.jobTitle(),
  salario: faker.number.int({ min: 1800, max: 8000 }),
}));

const setores = Array.from({ length: 10 }, (_, i) => {
  const item = faker.helpers.arrayElement(itensSetor);
  return {
    id: i + 1,
    descricao: item.descricao,
    categoria: item.categoria,
    valor: faker.number.int({ min: 50, max: 2000 }),
    data: faker.date.recent({ days: 60 }).toISOString().split('T')[0],
  };
});

const db = { pacotes, reservas: [], funcionarios, setores };

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('db.json gerado com sucesso!');
