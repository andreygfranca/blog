---
title: Testando Aplicações Spring Boot com Spock Framework
url: testando-aplicacoes-spring-boot-com-spock-framework
author: Andrey Franca
date: "2021-07-25"
tags:
  - tests
  - integration-test
  - spock-framework
  - spring-boot
 
---

A satisfação do usuário que utiliza determinado software depende da qualidade na utilização do mesmo. Um *bug* que chega em produção pode causar efeitos desastrosos, imagine um um software para controle de um equipamento médico em que uma falha no software pode causar a morte de um paciente. A fim de diminuir a quantidade de defeitos geralmente utiliza-se testes. Existem vários tipos de testes de software, o mais comum e mais utilizado são os testes unitários, por serem de fácil construção e demandar pouco tempo de para executar. Isto é, é possível em um projeto escrever testes unitários para cobrir cenários de utilização do software e obter feedbacks rápidos da qualidade do software por meio da execução dos testes.

Para facilitar a escrita destes testes existem diversos frameworks, um deles, e talvez o mais utilizado no mundo Java é o JUnit que permite o desenvolvedor com poucas linhas de código escrever um teste para cobrir determinados cenários. Por exemplo, no código abaixo temos um teste escrito com o JUnit para cobrir o cenário de buscar a lista de cidades que satisfazem um critério:

<pre><code class="language-java">
  @Test
  @DisplayName("When find by criteria name should return city")
  public void testFindByCriteriaName() {
    // Given
    CityCriteriaDTO cityCriteria = CityCriteriaDTO.builder()
        .name("Goiania")
        .build();
    City cityPersisted = City.builder()
        .name("Goiania")
        .state("Goias")
        .build();
    cityRepository.save(cityPersisted);
    
    // When
    List<City> cities = cityRepository.findByCriteria(cityCriteria);
    
    // Then
    assertThat(cities)
        .isNotEmpty()
        .hasSize(1)
        .satisfies(it -> assertThat(it.get(0)).isEqualToComparingFieldByField(cityPersisted));
  }
</code></pre>

Uma técnica para escrita de testes é o [BDD](https://pt.wikipedia.org/wiki/Behavior_Driven_Development) (*Behavior Driven Development*), em que os cenários a serem testados são descritos na estrutura *given-when-then* (dado-quando-então)¹:

1. **Dado** - Define as pré-condições, contexto e informações necessárias para a criação de um cenário de teste;
2. **Quando** - Define a ação executada em teste;
3. **Então** - Define o resultado esperado no teste;

O trecho de código apresentado acima está seguindo a estrutura do BDD, no entanto as fases estão definidas em comentários, dessa forma não existe nenhuma padronização rígida dos testes escritos, de forma que um programador pode escrever um teste de uma forma e outro programador no futuro não seguir as mesmas diretrizes e boas práticas. Neste sentido, o Spock framework pode ser adotado na criação de testes, de forma a escrever testes de forma simples, concisa e padronizada.

Spock é um framework de testes para aplicações Java, Groovy, Kotlin ou qualquer outra linguagem "*JVM-compatible*", que incorpora diversas *features* de outros frameworks do mercado como JUnit, Mockito e JBehave. É possível criar testes no estilo BDD utilizando as labels do java (blocos da terminologia do spock), além disso diferentemente de uma stack de testes utilizando JUnit em que você precisaria adicionar outras dependências no projeto para melhorar qualidade na escrita dos testes como por exemplo bibliotecas para asserções (Hamcrest, AsserJ) ou para Mocks (Mockito, PowerMock), no Spock você não precisa delas, pois como veremos à diante o mesmo já traz consigo todas estas features.

## Especificações
Nesta seção serão apresentados exemplo de utilização do spock com a linguagem Groovy, desta forma, será necessário o mínimo conhecimento necessário na linguagem para escrita dos testes.

Os testes no Spock são também chamados de especificações (Specifications), mais do que isso, todos os testes devem herdar da classe `spock.lang.Specification`. No código abaixo podemos ver um código com os blocos (given-when-then) bem definidos, o teste é meramente ilustrativo, foi criado uma classe que possui um método para multiplicar dois números:

<pre><code class="language-java">
class MultiplierTest extends spock.lang.Specification {

    def "Should multiply two number"() {
        given:
        Multiplier multiplier = new Multiplier(5, 5)

        when:
        def result = multiplier.multiply()

        then:
        result == 25
    }
}
</code></pre>

## Asserções

No código apresentado na seção anterior podemos ver os blocos separados, além disso no bloco de verificação (then) diferentemente dos testes escritos com o JUnit não tem nenhum método `assert*`, isso se dá ao fato de que na linguagem Groovy diferentemente do Java (somente variáveis booleanas podem ser testadas nos asserts) todos os objetos podem ser considerados *true* ou *false*. De forma geral o Groovy trata todos os objetos como *true* a não ser que:

* O objeto é uma string vazia;
* O objeto é null;
* O objeto é o número zero;
* O objeto é uma collection vazia (map, list, array, etc.);
* O objeto é `false`; 
* O objeto é uma regex que falhou.

Como mencionado a palavra chave `assert` não é obrigatória nos testes, pois o spock automaticamente a coloca em todas as asserções nos blocos `then` e `expect`, no entanto existem casos em que ela deve ser utilizada:

* Em alguns testes as asserções se repetem, de forma que alguns desenvolvedores refatoram e colocam estas em um método separado, dessa forma o spock não vai colocar o `assert` nas linhas dentro do método;
* Dentro de closures;
* Em outros blocos que não sejam `then` ou `expect`.

## Mocks e Stubs
Algumas vezes não queremos, não precisamos ou não podemos confiar em determinadas dependências do nosso objeto em testes, por exemplo, podemos estar testando um componente que depende da resposta de uma requisição HTTP a outro serviço externo. Esse tipo de situação pode fazer o nosso testes falhar, pois o serviço externo pode estar fora do ar. Esse tipo de dependência deve ser evitada em testes e uma solução para este tipo de problema é utilizar *Mocks* (dublês) 



<hr style="border-top: 1px solid gray; width:50%">
¹ Existem outras técnicas parecidas com o BDD para organização e escritas de testes como por exemplo o [AAA](http://wiki.c2.com/?ArrangeActAssert) (*Arrange-Act-Assert*)  