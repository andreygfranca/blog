---
title: Testando com Spock Framework
url: testando-spock-framework
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
Algumas vezes não queremos, não precisamos ou não podemos confiar em determinadas dependências do nosso objeto em testes, por exemplo, podemos estar testando um componente que depende da resposta de uma requisição HTTP a outro serviço externo, ou talvez o envio de emails, imagine enviar emails toda vez que o teste for executado. Esse tipo de situação pode fazer o nosso testes falhar, pois o serviço externo pode estar fora do ar. Esse tipo de dependência não-determinística deve ser evitada em testes e uma solução para este tipo de problema é utilizar *Mocks* (dublês), ou de forma mais geral Objetos *Fakes*.

De forma geral existem dois tipos possíveis de objetos fakes:

* *Stubs*: são classes fakes em que é possível pré-programar o retorno dos seus métodos, de forma a montar o cenário esperado ao interagir com determinado objeto.
* *Mocks*: são classes fakes que além da possibilidade de pré-programar os retornos ainda é possível examinar a interações naquele objeto específico.

De forma a escrever um teste limpo e conciso o primeiro passo é identificar as dependências do nosso objeto em testes, em seguida definir as dependências que serão stubs e mocks (em muitos projetos não existe essa diferenciação e todos são tratados como mocks). No trecho de código abaixo é apresentado um teste escrito para cobrir um cenário fictício de validar o serviço de compra para não permitir efetuar a compra quando não houver produtos disponíveis: 

<pre><code class="language-java">
    void setup() { // (1)
        servicoEstoque = Stub(ServicoEstoque)
        servicoFornecedor = Mock(ServicoFornecedor)
        servicoCompra = new ServicoCompra(servicoEstoque, servicoFornecedor)
    }

    def "Nao deve adicionar produto na sacola quando nao estiver diponivel"() {
        given:
            Produto produto = new Produto(
                    sku: '234', 
                    valor: 45.5,
                    nome: 'Pizza G'
            )
            Sacola sacola = new Sacola()
            servicoEstoque.estaDisponivel(produto) >> false // (2)

        when:
            servicoCompra.comprar(sacola, produto)

        then:
            thrown(ProdutoNaoDisponivelException) // (3)
            1 * servicoFornecedor.notificarProdutoNaoDisponivel() //(4)
    }
</code></pre>


O método `setup()` em (1) é chamado automaticamente antes de cada teste rodar [[1]](https://spockframework.org/spock/docs/1.0/spock_primer.html#_fixture_methods). No apontamento (2) estamos indicando que o método `estaDisponivel` deve retornar false. Em (3) utilizamos um dos recursos do spock para verificar que uma exception foi lançada, já em (4) verificamos que o método `notificarProdutoNaoDisponivel` foi invocado 1 vez, para os usuário de Mockito é bem parecido com o método `verify()`.

## Conclusão

Neste artigo foi apresentado uma introdução sucinta ao spock, um framework que entrega várias features em um só pacote, essa característica aliada com as funcionalidades da linguagem Groovy faz com que seja possível a criação de testes concisos, legíveis e robustos de forma simples e rápida.

<hr style="border-top: 1px solid gray; width:50%">
¹ Existem outras técnicas parecidas com o BDD para organização e escritas de testes como por exemplo o [AAA](http://wiki.c2.com/?ArrangeActAssert) (*Arrange-Act-Assert*),