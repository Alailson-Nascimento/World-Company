# World Company

Sistema de agência de viagens com área de cliente e ERP administrativo, desenvolvido em Angular com arquitetura page / model / service. Projeto da Avaliação Parcial 2 (aula 16).

## Tecnologias

- Angular (standalone components + signals)
- HttpClient consumindo dados via GET (arquivos JSON estáticos em `public/data/`)
- Chart.js (gráfico de gastos no dashboard)
- Faker.js (usado na geração inicial dos dados fictícios de funcionários e setores, em português)
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

## Arquitetura de dados

Os dados de **pacotes**, **funcionários** e **setores** são consumidos via `HttpClient` (GET) a partir de arquivos JSON estáticos, localizados em `public/data/`:

- `public/data/pacotes.json`
- `public/data/funcionarios.json`
- `public/data/setores.json`

Essa abordagem mantém o fluxo real de consumo de API (Observable, `.subscribe()`, tratamento de erro e loading) sem depender de um servidor rodando à parte — o que permite que o projeto funcione tanto localmente quanto publicado em hospedagem estática (Netlify), sem diferença de comportamento.

As **reservas** funcionam de forma diferente, já que envolvem escrita (criar uma reserva nova). Elas são gerenciadas por um `signal` no `ReservaService` e persistidas no `localStorage` do navegador — assim a reserva sobrevive a um F5, mas fica local a cada navegador/dispositivo (limitação esperada de um projeto sem backend próprio).

## Como rodar o projeto

### 1. Instalar as dependências
```bash
npm install
```

### 2. Rodar o Angular
```bash
ng serve
```

Acesse `http://localhost:4200`

Não é necessário nenhum servidor adicional — os dados são lidos diretamente dos arquivos estáticos em `public/data/`.

## Estrutura do projeto

```
public/
└── data/
    ├── pacotes.json
    ├── funcionarios.json
    └── setores.json

src/app/
├── models/              → Pacote, Reserva, Setor, Funcionario
├── services/
│   ├── pacote.ts         → HttpClient GET (pacotes.json)
│   ├── reserva.ts        → signal + localStorage
│   └── erp/
│       ├── alimentacao.ts    → HttpClient GET (setores.json, filtrado)
│       ├── funcionarios.ts   → HttpClient GET (funcionarios.json)
│       └── operacao.ts       → HttpClient GET (setores.json, filtrado)
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
ng lint                  # checa qualidade do código
ng test                  # roda os testes unitários
ng build                 # gera o build de produção
npx prettier --write .   # formata todos os arquivos
```
