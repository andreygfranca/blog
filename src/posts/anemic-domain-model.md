---
title: Modelo de Domínio Anêmico e Programação Orientada a Objetos
url: modelo-dominio-anemico-e-poo
author: Andrey Franca
date: "2021-12-01"
tags:
  - ddd
  - anemic-model
  - oop
  - object-thinking
 
---

Determinar se um modelo de domínio é anêmico é possível através das seguintes perguntas [1]:

1. As entidades do seu modelo de domínio possuem majoritariamente métodos públicos *getters* e *setters,* e quase nenhuma regra de negócio ?
2. Os componentes do software que mais utilizam o seu "modelo de domínio" são aqueles que possuem as regras de negócios, e basicamente somente invocam os métodos *getters* e *setters* das entidades do domínio ? E geralmente você chama esses componentes de **Camada de Serviço.**

O modelo de domínio anêmico é um modelo de dados em que as entidades são apenas contêineres para os dados, geralmente utilizadas para mapeamento objeto-relacional, ou como DTOs para serialização/deserialização [1]. Dessa forma, para evitar o modelo de domínio anêmico  não devemos expor dados em nossos objetos, mas sim comportamentos [2]. E isso é realmente importante na programação orientada a objetos, pois objetos não deveriam expor dados, mas sim esconder dados. 

Uma das grandes confusões existentes hoje na maioria dos projetos de software escritos em uma linguagem de programação orientada a objetos é o entendimento de que objetos são contêineres para dados. Nesta perspectiva, são criadas classes com atributos privados, construtores e no final um amontoado de métodos mutadores (*getters* e *setters*) gerados por uma IDE. Isso na maioria dos casos se dá pois há dependências à bibliotecas que forçam o programador a escrever este tipo de código (jackson, hibernate, etc.). 

Contra essa ideia de tratar objetos como estrutura de dados existem vários argumentos, como por exemplo a violação ao princípio do encapsulamento ou a exposição de detalhes de implementação. Em linguagens procedurais como C existem as *structs,* que são exatamente contêineres para dados sem nenhum comportamento em que as operações sobre esses dados são realizadas em outra parte do código, fora da *struct*. O encapsulamento veio justamente para resolver esse problema, mas aparentemente estamos ignorando isso e transformando objetos em *structs,* ou seja, estamos voltando a escrever código procedural.

Para concluir, é inegável que o paradigma de programação orientada a objetos trouxe vários benefícios para a engenharia de software. No entanto, na maioria das vezes, softwares são intensivos em dados. Neste sentido, é preciso fazer com que  paradigmas diferentes trabalhem juntos¹. Portanto, modelar um software totalmente orientado a objetos não é uma tarefa fácil. Neste sentido, algumas técnicas podem ser aplicadas para como por exemplo _Two-Layers Repository_ [3] e _SQL Speaking-Objects_[4].

## Referências

[1] Vernon, V. (2013). Implementing domain-driven design. Addison-Wesley.

[2] [https://www.yegor256.com/2016/11/21/naked-data.html](https://www.yegor256.com/2016/11/21/naked-data.html)

[3] https://www.vzurauskas.com/2019/04/07/two-layer-repositories-in-spring

[4] https://www.yegor256.com/2014/12/01/orm-offensive-anti-pattern.html

<hr style="border-top: 1px solid gray; width:50%">
¹ Bancos de dados relacionais por exemplo são organizados em linhas e tabelas, objetos não deveriam ser.