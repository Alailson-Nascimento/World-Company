const fs = require('fs');
const path = require('path');

const pacotes = [
  {
    id: '1',
    destino: 'Paris, França',
    descricao:
      'Conheça a Torre Eiffel, o Museu do Louvre e as charmosas ruas de Montmartre nessa experiência inesquecível pela capital francesa.',
    precoPorDia: 650,
    imagemUrl: '/imagens/pacotes/paris.jpg',
    temRestaurante: true,
    cardapio: 'Culinária francesa autêntica com croissants, queijos finos e vinhos selecionados.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Sim, cancelamentos com até 7 dias de antecedência têm reembolso integral.',
      },
      {
        pergunta: 'Inclui café da manhã?',
        resposta: 'Sim, servido diariamente das 7h às 10h30.',
      },
    ],
  },
  {
    id: '2',
    destino: 'Rio de Janeiro, Brasil',
    descricao:
      'Praias paradisíacas, o Cristo Redentor e a vibrante cultura carioca esperam por você numa das cidades mais icônicas do mundo.',
    precoPorDia: 420,
    imagemUrl: '/imagens/pacotes/rio.jpg',
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
    id: '3',
    destino: 'Santorini, Grécia',
    descricao:
      'Casinhas brancas com cúpulas azuis, pôr do sol espetacular e águas cristalinas num dos destinos mais fotografados do Mediterrâneo.',
    precoPorDia: 780,
    imagemUrl: '/imagens/pacotes/santorini.jpg',
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
    id: '4',
    destino: 'Tóquio, Japão',
    descricao:
      'Tradição milenar encontra tecnologia de ponta nas ruas movimentadas de uma das metrópoles mais fascinantes da Ásia.',
    precoPorDia: 590,
    imagemUrl: '/imagens/pacotes/tokyo.jpg',
    temRestaurante: true,
    cardapio: 'Culinária japonesa autêntica, incluindo sushi, ramen e pratos tradicionais.',
    faq: [
      {
        pergunta: 'Posso cancelar a reserva?',
        resposta: 'Sim, cancelamentos com até 7 dias de antecedência têm reembolso integral.',
      },
      {
        pergunta: 'Inclui café da manhã?',
        resposta: 'Sim, servido diariamente das 7h às 10h30.',
      },
    ],
  },
  {
    id: '5',
    destino: 'Cusco, Peru',
    descricao:
      'Porta de entrada para Machu Picchu, com rica história inca, arquitetura colonial e paisagens andinas de tirar o fôlego.',
    precoPorDia: 340,
    imagemUrl: '/imagens/pacotes/cusco.jpg',
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
    id: '6',
    destino: 'Bali, Indonésia',
    descricao:
      'Templos milenares, praias tropicais e terraços de arroz verdejantes num paraíso perfeito para relaxar e se reconectar.',
    precoPorDia: 380,
    imagemUrl: '/imagens/pacotes/bali.jpg',
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

const dbPath = path.join(__dirname, 'db.json');

let bancoAtual = {};

if (fs.existsSync(dbPath)) {
  try {
    bancoAtual = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (erro) {
    console.error('Erro ao ler o db.json:', erro.message);
    process.exit(1);
  }
}

const banco = {
  pacotes,

  reservas: bancoAtual.reservas ?? [],

  funcionarios: bancoAtual.funcionarios ?? [],

  setores: bancoAtual.setores ?? [],

  $schema: './node_modules/json-server/schema.json',
};

fs.writeFileSync(dbPath, JSON.stringify(banco, null, 2), 'utf8');

console.log('✅ db.json gerado com sucesso!');
console.log(`📦 ${pacotes.length} pacotes cadastrados.`);
console.log('🖼️ Imagens configuradas para a pasta public.');
console.log(`📁 Arquivo: ${dbPath}`);
