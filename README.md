# World Company

Sistema de agência de viagens com área de cliente e ERP administrativo, desenvolvido em Angular com arquitetura page / model / service. Projeto da Avaliação Parcial 2 (aula 16).

## Tecnologias

- Angular (standalone components + signals)
- HttpClient consumindo API REST (json-server)
- Chart.js (gráfico de gastos no dashboard)
- Faker.js (dados fictícios de funcionários e setores, em português)
- SCSS puro (sem Angular Material)

## O que tem

**Área do cliente**
- Home com pacotes de viagem para 6 destinos reais (Paris, Rio de Janeiro, Santorini, Tóquio, Cusco, Bali), cada um com foto, descrição e preço por dia
- Página dedicada por pacote: FAQ em accordion, cardápio do restaurante (quando houver), formulário de reserva com cálculo automático de preço e bloqueio de datas já reservadas

**Área do ERP (gerente)**
- Dashboard com totais consolidados (pacotes cadastrados, reservas, receita, gastos por setor, saldo) e gráfico de barras comparando gastos entre setores
- 3 setores com listagem de gastos: Alimentação, Funcionários, Operação (luz, água, internet)
- Navegação por menu hambúrguer responsivo entre Dashboard e os 3 setores

**Geral**
- Identidade visual própria (paleta verde-petróleo + dourado, tipografia serifada + sans-serif)
- Totalmente responsivo (mobile, tablet, desktop)
- Testes unitários (`ng test`) e lint (`ng lint`) configurados

## Como rodar o projeto

### 1. Instalar as dependências
```bash
npm install
```

### 2. Gerar o banco de dados fictício
```bash
node generate-db.js
```
Isso cria o arquivo `db.json` na raiz do projeto.

### 3. Subir a API fake (em um terminal)
```bash
npx json-server --watch db.json --port 3000
```

### 4. Rodar o Angular (em outro terminal)
```bash
ng serve
```

Acesse `http://localhost:4200`

## Estrutura do projeto

```
src/app/
├── models/              → Pacote, Reserva, Setor, Funcionario
├── services/
│   ├── pacote.ts
│   ├── reserva.ts
│   └── erp/
│       ├── alimentacao.ts
│       ├── funcionarios.ts
│       └── operacao.ts
├── pages/
│   ├── home/
│   ├── pacote-detalhe/
│   └── erp/
│       ├── dashboard/
│       ├── alimentacao/
│       ├── funcionarios/
│       └── operacao/
└── app.routes.ts
```

## Comandos úteis

```bash
ng lint          # checa qualidade do código
ng test          # roda os testes unitários
ng build         # gera o build de produção
npx prettier --write .   # formata todos os arquivos
```
