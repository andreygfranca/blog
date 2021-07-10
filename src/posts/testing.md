---
title: Testando Aplicações Java com JUnit.
url: testando-aplicacoes-java-com-junit
author: Andrey Franca
date: "2013-03-15"
tags:
  - tests
  - tag
 
---

A satisfação do cliente/usuário que utiliza determinado software depende da qualidade na utilização do mesmo. A qualidade do software é uma área de estudo na engenharia de software, uma das vertentes da qualidade de software são os testes automatizadoes. Existem vários tipos de testes de software, o mais comum e mais utilizado são os testes unitários, por serem de fácil e construção e demandar pouco tempo de processamento para executar. Isto é, é possível em um projeto escrever testes unitários para cobrir cenários de utilização do software e obter feedbacks rápidos da qualidade do software por meio da execução dos testes.

Para facilitar a escrita destes testes existem diversos frameworks para escreve-los, um deles, e talvez o mais utilizado no mundo Java é o JUnit que permite o desenvolvedor com poucas linhas de código escrever um teste para cobrir determinado cenários.

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

Por exemplo, no trecho de código acima estamos testando o método `findByCriteria` e verificando se o retorno era o esperado.

<pre><code class="language-java">
  @Test
  @Tag("customer-it")
  @DisplayName("When creating a new customer then make sure it was actually created.")
  public void testCreateCustomer() {
    CustomerCreateDTO customer = CustomerCreateDTO.builder()
        .name("Sam Rogers")
        .age(57)
        .birthDate(LocalDate.of(1963, 10, 1))
        .gender(Gender.MALE.toString())
        .city(CityCreateDTO.builder()
            .name("test")
            .state("test1")
            .build())
        .build();
    
    given()
        .body(customer)
        .contentType("application/json")
        .when()
        .post("/api/v1/customer")
        .then()
        .assertThat()
        .statusCode(HttpStatus.CREATED.value())
        .and()
        .body("name", equalTo("Sam Rogers"))
        .body("age", equalTo(57))
        .body("birthDate", equalTo("1963-10-01"))
        .body("gender", equalTo("MALE"))
        .body("city.name", equalTo("test"))
        .body("city.state", equalTo("test1"));
  }
</code></pre>

O teste acima é um teste de integração para uma API REST utilizando a biblioteca `RestAssured`.