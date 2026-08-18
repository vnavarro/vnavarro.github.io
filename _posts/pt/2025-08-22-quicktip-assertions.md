---
layout: post
comments: true
title:  "[QuickTips] Assertion guidelines"
date:   2025-08-22 10:00:00 -0300
description: ""
category: Development
tags: [quicktips, development, assertions, programming]
lang: pt
---

Julgo ser muito importante o uso de *asserts* durante o processo de desenvolvimento de software, ele evita que os //TODO virem apenas uma lembrança enviada para o repositório de código e para sempre depositado em uma geladeira.

Isso é tão emblemático que me recordo do tempo em que trabalhei na DasDad em que eu e meus amigos de faculdades literalmente criamos uma coluna chamada geladeira no Trello onde ficavam visíveis as tarefas "esquecidas". Seria mais engraçado se também não fosse trágico.

Nesse ponto os *asserts* evitam de certa forma esse acontecimento pois provocam um erro e/ou *crash* do seu programa bem na sua cara durante a execução do mesmo, forçando aquela parte do código seja concertada.

Diferente das exceções que visam avisar sobre erros de lógica e execução não esperados a serem tratados no código, os *asserts* são colocados por nós programadores para avisar uns aos outros de situações que não devem acontecer e precisam ser corrigidas/implementadas.

Entra então uma de várias possibilidades problemáticas que já encontrei em diversas situações, os *asserts* silenciosos, aqueles que são subvertidos para fora do erro gritante em vermelho na IDE e enviados para algum novos cantos, como um sistema de logs, de métricas, ou outro sistema de análises qualquer. Voltamos para a geladeira.

Aqui entra o conselho, no caso uma lista deles, uma guia que visa direcionar o uso de *asserts* a fim de evitar o emaranhado de problemas possíveis que advém do uso, digamos, sem freios, da ferramenta.

Sim, use.
- Existe um ponto em que o código não deveria falhar, não é um erro/exceção esperado e sim um caso específico, talvez de difícil ocorrência mas que se ocorrer é necessário corrigir o quanto antes.
- Uma característica (*feature*) nova ainda não implementada que será realizada posteriormente, registrada na lista de tarefas e cujo *assert* não seria enviado para produção.
- Um fluxo do código em que não se quer que um try/catch capture aquele caso e sim que alguém (talvez você mesmo) implemente a solução em breve.
- Avisar sobre interfaces/protocolos que devem ser implementados evitando que sejam esquecidos.
- Depuração de fluxos de código em que é melhor causar uma parada/quebra no programa a fim de melhor identificar o(s) problema(s).

Não, evite.
- Log regular de código ou de depuração. Para isso existem as funções print/log de cada linguagem.
- Registro de eventos em sistemas de métricas/log.
- Registro de quebra (*crash*) silenciosas. A tendência é ninguém corrigir isso.
- Esqueça de remover *asserts* de depuração.
- Como controle de fluxo de código.

Na dúvida evite e antes de começarem a usar montes de *asserts* faça uma discussão aberta com os membros da equipe.

Esse artigo é opinativo baseado nas minhas experiências de trabalho e na minha realidade, não é escrito em pedra e nem uma lei, então espero que ajude a formar sua idéia de como usar melhor os *asserts*, independente de seguir o que falo ou não.