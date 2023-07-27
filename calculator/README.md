# Calculadora em JavaScript

Este documento fornece uma visão geral detalhada do projeto de uma calculadora em JavaScript. O projeto é dividido em duas classes principais: `Calculator` e `Display`.

## Manipulação de Array

A lógica central do projeto reside em um algoritmo sofisticado que manipula um array (`keyboardList` na classe `Calculator`) para criar uma sequência que representa uma expressão matemática. A sequência inclui números e operadores que são adicionados sequencialmente.

### Descrição

O algoritmo em questão foi projetado para tratar um fluxo de entradas de usuário em uma sequência que representa uma expressão matemática. O fluxo de entrada pode incluir dígitos numéricos, pontos (para números decimais) e operadores matemáticos (como '+', '-', '*' e '/'). Essas entradas são armazenadas em um array que é manipulado para formar a expressão matemática correta, de acordo com as regras da matemática e da lógica de programação.

### Funcionamento

O algoritmo segue dois principais pontos de lógica para tratar as entradas do usuário:

1. **Inserção de um número ou ponto:** Quando o usuário insere um dígito numérico ou um ponto, o algoritmo verifica o último elemento no array. Se o último elemento também for um número ou ponto, o novo caractere é concatenado ao último elemento para formar um número de múltiplos dígitos ou um número decimal. Se o último elemento for um operador (ou se o array estiver vazia), o novo caractere é adicionado como um novo elemento.

   Veja um exemplo de como o array é transformado neste processo:
   - **Input**: `['1']` → **Output**: `['1']`
   - **Input**: `['1', '1']` → **Output**: `['11']`
   - **Input**: `['11', '.']` → **Output**: `['11.']`
   - **Input**: `['11.', '1']` → **Output**: `['11.1']`

2. **Inserção de um operador:** Quando o usuário insere um operador, o algoritmo sempre trata esse operador como um novo elemento, independentemente do último elemento no array. Isso ocorre porque, na matemática, um operador deve sempre estar entre dois números e, portanto, deve ser um elemento separado.

   Veja um exemplo de como o array é transformado quando um operador e um número são inseridos:
   - **Input**: `['11.1', '+']` → **Output**: `['11.1', '+']`
   - **Input**: `['11.1', '+', '1']` → **Output**: `['11.1', '+', '1']`

Por fim, o array resultante representa uma expressão matemática completa, onde cada elemento é ou um número (único ou de múltiplos dígitos, inteiro ou decimal) ou um operador. Este array pode ser processado adicionalmente para calcular o resultado da expressão.

## Resumo

Este projeto de calculadora em JavaScript se destaca por sua abordagem de manipulação de arrays para processar expressões matemáticas. As entradas do usuário, incluindo números, pontos decimais e operadores matemáticos, são armazenadas em um array. Este array é então manipulado por um algoritmo sofisticado que segue as regras da matemática e da lógica de programação para formar a expressão matemática correta.

Este algoritmo permite que o programa trate corretamente números de vários dígitos e decimais, bem como insira operadores nos locais corretos. A expressão matemática formada pode ser usada para calcular resultados precisos.

As classes `Calculator` e `Display` colaboram para criar a interface da calculadora e processar a entrada do usuário. A classe `Calculator` gerencia a entrada do usuário e realiza os cálculos, enquanto a classe `Display` lida com a exibição da entrada e do resultado para o usuário.

Em resumo, este projeto é um exemplo robusto de como arrays podem ser usados de forma eficaz para processar entradas complexas e calcular resultados matemáticos.
