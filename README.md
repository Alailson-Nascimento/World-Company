WORLD COMPANY
=========================================

Estrutura page / model / service, cobrindo só o que a Avaliação
Parcial 2 (aula 16) pede, sem excesso.

O QUE TEM:

- Main page (Home) com pacotes de viagem, cada um levando pra uma
  página dedicada
- Página dedicada: FAQ (accordion), cardápio, formulário de reserva
  com cálculo de preço e bloqueio de datas conflitantes
- ERP com 3 setores: Alimentação, Funcionários, Operação (luz/água/
  internet) — cobre os exemplos citados no PDF
- Dashboard do gerente com totais consolidados (pacotes, reservas,
  receita, gastos, saldo)
- Navegação entre visão cliente (Home) e visão ERP (Dashboard)
- CSS básico já incluso (grid simples, cores, sem enfeite demais)

COMO USAR:

1. Rode os comandos do zero (ng new, ng add material, provideHttpClient,
   npm install faker, criar pastas) — conforme o passo a passo que te
   passei no chat
2. Copie os arquivos deste zip para os mesmos caminhos dentro de
   src/app/ do seu projeto
3. Coloque o generate-db.js na raiz do projeto e rode:
   node generate-db.js
4. Suba o json-server:
   npx json-server --watch db.json --port 3000
5. Em outro terminal:
   ng serve

ESTRUTURA:
src/app/
├── models/ (pacote, reserva, setor, funcionario)
├── services/ (pacote, reserva, erp/alimentacao, erp/funcionarios, erp/operacao)
├── pages/
│ ├── home/
│ ├── pacote-detalhe/
│ └── erp/
│ ├── dashboard/
│ ├── alimentacao/
│ ├── funcionarios/
│ └── operacao/
└── app.routes.ts

O QUE NÃO TEM (de propósito, pra manter simples):

- Carousel de verdade (a Home já lista os pacotes em grid, o que
  cumpre a exigência; se quiser um carousel de verdade depois,
  dá pra evoluir)
- Manutenção e Marketing como setores separados (o PDF fala em
  "alguns exemplos", 3 setores bem feitos já atendem)
- Testes automatizados
