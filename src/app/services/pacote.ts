import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Pacote } from '../models/pacote';

@Injectable({
  providedIn: 'root',
})
export class PacoteService {
  private readonly pacotes: Pacote[] = [
    {
      id: 1,
      destino: 'Paris, França',
      descricao:
        'Conheça a Torre Eiffel, o Museu do Louvre e as charmosas ruas de Montmartre nessa experiência inesquecível pela capital francesa.',
      precoPorDia: 650,
      imagemUrl: '/imagens/pacotes/paris.jpg',
      temRestaurante: true,
      cardapio: 'Croissant, Ratatouille, Coq au Vin e Crème Brûlée',
      faq: [
        {
          pergunta: 'Qual é a melhor época para visitar Paris?',
          resposta:
            'A primavera e o outono oferecem temperaturas agradáveis e ótimas condições para conhecer a cidade.',
        },
        {
          pergunta: 'O pacote inclui hospedagem?',
          resposta:
            'Consulte as condições da reserva para verificar as opções de hospedagem disponíveis.',
        },
        {
          pergunta: 'O restaurante está incluso no pacote?',
          resposta:
            'O pacote possui restaurante com opções de pratos típicos da culinária francesa.',
        },
      ],
    },

    {
      id: 2,
      destino: 'Rio de Janeiro, Brasil',
      descricao:
        'Conheça as praias de Copacabana e Ipanema, visite o Cristo Redentor e aproveite as paisagens da Cidade Maravilhosa.',
      precoPorDia: 350,
      imagemUrl: '/imagens/pacotes/rio.jpg',
      temRestaurante: true,
      cardapio: 'Feijoada, Moqueca, Pão de Queijo e Açaí',
      faq: [
        {
          pergunta: 'O pacote inclui passeios?',
          resposta: 'Os passeios disponíveis podem ser adicionados durante o processo de reserva.',
        },
        {
          pergunta: 'Quais praias posso conhecer?',
          resposta:
            'O Rio oferece diversas opções, incluindo Copacabana, Ipanema e Barra da Tijuca.',
        },
        {
          pergunta: 'O restaurante oferece comida brasileira?',
          resposta: 'Sim. O restaurante oferece pratos tradicionais da culinária brasileira.',
        },
      ],
    },

    {
      id: 3,
      destino: 'Santorini, Grécia',
      descricao:
        'Descubra as famosas casas brancas, o mar azul do Mediterrâneo e o incrível pôr do sol de Santorini.',
      precoPorDia: 750,
      imagemUrl: '/imagens/pacotes/santorini.jpg',
      temRestaurante: true,
      cardapio: 'Moussaka, Gyros, Salada Grega e Baklava',
      faq: [
        {
          pergunta: 'Santorini é indicada para viagens românticas?',
          resposta: 'Sim. A ilha é conhecida por suas paisagens, praias e incríveis pôr do sol.',
        },
        {
          pergunta: 'O pacote possui restaurante?',
          resposta: 'Sim. O pacote oferece restaurante com pratos tradicionais gregos.',
        },
        {
          pergunta: 'Posso fazer passeios pela ilha?',
          resposta: 'Sim. Existem diversas opções de passeios e experiências disponíveis.',
        },
      ],
    },

    {
      id: 4,
      destino: 'Tóquio, Japão',
      descricao:
        'Explore a mistura de tradição e tecnologia de Tóquio, com templos históricos, bairros modernos e uma gastronomia incrível.',
      precoPorDia: 850,
      imagemUrl: '/imagens/pacotes/toquio.jpg',
      temRestaurante: false,
      faq: [
        {
          pergunta: 'Tóquio possui atrações tradicionais?',
          resposta: 'Sim. A cidade possui templos, santuários e diversos locais históricos.',
        },
        {
          pergunta: 'O pacote possui restaurante?',
          resposta: 'Este pacote não possui restaurante próprio.',
        },
        {
          pergunta: 'Qual moeda é utilizada no Japão?',
          resposta: 'A moeda oficial do Japão é o iene.',
        },
      ],
    },

    {
      id: 5,
      destino: 'Cusco, Peru',
      descricao:
        'Conheça Cusco, a antiga capital do Império Inca, e prepare-se para uma experiência inesquecível rumo a Machu Picchu.',
      precoPorDia: 450,
      imagemUrl: '/imagens/pacotes/cusco.jpg',
      temRestaurante: true,
      cardapio: 'Lomo Saltado, Ceviche, Ají de Gallina e Picarones',
      faq: [
        {
          pergunta: 'O pacote permite visitar Machu Picchu?',
          resposta: 'Cusco é um dos principais pontos de partida para conhecer Machu Picchu.',
        },
        {
          pergunta: 'O restaurante possui pratos peruanos?',
          resposta: 'Sim. O restaurante oferece opções tradicionais da culinária peruana.',
        },
        {
          pergunta: 'Preciso de preparo para conhecer Cusco?',
          resposta:
            'Como Cusco está em uma região de altitude elevada, recomenda-se adaptação gradual.',
        },
      ],
    },

    {
      id: 6,
      destino: 'Bali, Indonésia',
      descricao:
        'Relaxe nas praias paradisíacas de Bali, conheça seus templos e aproveite uma viagem cercada por natureza e cultura.',
      precoPorDia: 550,
      imagemUrl: '/imagens/pacotes/bali.jpg',
      temRestaurante: true,
      cardapio: 'Nasi Goreng, Satay, Gado-Gado e Rendang',
      faq: [
        {
          pergunta: 'Bali possui praias?',
          resposta: 'Sim. Bali possui diversas praias e paisagens naturais.',
        },
        {
          pergunta: 'O pacote possui restaurante?',
          resposta: 'Sim. O pacote oferece restaurante com pratos tradicionais da Indonésia.',
        },
        {
          pergunta: 'Bali possui atrações culturais?',
          resposta: 'Sim. A ilha possui templos, cerimônias e diversas atrações culturais.',
        },
      ],
    },
  ];

  getPacotes() {
    return of(this.pacotes);
  }

  getPacotePorId(id: number) {
    const pacote = this.pacotes.find((item) => item.id === id) ?? null;

    return of(pacote);
  }
}
