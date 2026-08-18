---
layout: post
comments: true
title:  "[Homelab] Experimentando com CasaOS e Colima no MacOS."
date:   2025-09-22 10:00:00 -0300
description: ""
category: Development
tags: [homelab, development, hardware, programming, experimentation, colima, casaos, opensource]
lang: pt
---

> **TL;DR: Só quer o resultado? Vai no perfil do [Github](https://github.com/vnavarro/colima_casaos).**

# Contexto

Uma tendência da qual não fazia idéia, os homelabs/homeservers parece ter entrado em alta na esteira do aumentode  controle e da segurança de dados pessoais. 

Visto os múltiplos vazamentos de dados, LGPD, GDPR, IA usando tudo e mais um pouco da vida de cada indivíduo da terra através de empresas que poucou ou nunca se importam pois são pautadas no lucro, é mais do que justificável que hajam cada vez mais pessoas tomando de volta o controle daquilo que elas são donas.

Isso tudo foi pensado depois que comecei a planejar alterações em um mac mini antigo que tenho comigo parado fazendo absolutamente nada. Eis que inicia o nascimento do servidor caseiro.

# Ok, mas e ai?

Me organizei nas buscas e entendi que queria inicialmente facilitar para o meu lado, descobri o sistema open source [CasaOS](https://wiki.casaos.io/pt-br/home), um hub que pode ser instalado diretamente numa máquina Linux e transforma-lá num ponto de acesso para filmes, fotos, arquivos e mais.

> O CasaOS é um programa de código aberto baseado na comunidade, focado em fornecer simplicidade na criação e administração de nuvem doméstica.

Ele faz bem mais queser uma nuvem doméstica pois permite a criação de extensões, aplicativos, que cuidam de tarefas e ações específicas flexibilizando a criação desse servidor pessoal.

![CasaOS "loja" de apps](https://raw.githubusercontent.com/WisdomSky/CasaOS-LinuxServer-AppStore/main/tip-2.jpg)

Exemplos:

* 2FA;
* Filtrador de Ads;
* Sincronizador de arquivos;
* Biblioteca de música;
* Automação residencial;
* Biblioteca de Fotos;

# E no MacOS?

Não existe uma compilação que funcione diretamente no mac no momento em que esse artigo é escrito. Solução: VM.

E no objetivo de automatizar a configuração e controle dessa vm de forma mais fácil acabei encontrando [esse post](https://www.junian.net/tech/macos-install-casaos/) do Junian que indica o uso do Colima para essa tarefa.

Uma sequência claramente automatizável:

```
brew install colima
colima start --vm-type=vz --network-address
colima ssh
curl -fsSL https://get.casaos.io | sudo bash
```

Traduzindo:
1 - Instala o Colima usando Homebrew
2 - Inicia a configuraçao de um container (vm) com acesso a rede do host (o mac). O Colima cria um container de nome padrão "default"
3 - Acessa a vm com ssh
4 - Baixa o script de configuração do CasaOS e executa o mesmo com permissão de admin e bash

O resultado é acessar o CasaOS via IP apresentado ao fim da execução no terminal.

![Imagem do CasaOS no mac mini](/assets/img/casaos_home.png)

# E a automatização?

Para essa parte foi necessário uma boa quantidade de aprendizado e experimentação.

Depois de testar tudo que era necessário e errar um número considerável de vezes o processo final ficou dividido em dois scripts: um bash e um python.

A escolha do Python foi pela familiaridade, pela vastidão de recursos de pesquisa online e por estar usualmente já instalado no mac. Uma boa alternativa seria utilizar o Rust.

Outra decisão foi dar ou não suporte para automatizar no Linux também, optei por fazê-lo.

Ainda na escolha eu decidi por utilizar o Homebrew pois considero uma solução confiável pra gerenciar as instalações no mac.

As outras duas ferramentas que são necessárias são o Docker e o próprio Colima.

Por último fica restando o CasaOS.

## Python check no bash

O [jarbas.sh](https://github.com/vnavarro/colima_casaos/blob/base/jarbas.sh) cuida de verificar se o python se faz presente ou não.

Para isso bastou usar o comando *command*:
`if command -v python3 >/dev/null 2>&1; then`

Logo em seguida basta usar o Homebrew ou apt-get, ou outra ferramenta para instalar o Python (nesse caso a v3).

```
$ brew install python3
```

```bash
$ sudo apt-get update
$ sudo apt-get install -y python3
```

## Todo o resto é em Python

Dentro do script Jarbas.py está organizado toda a lógica de configuração e início. Além de ser possível remover o ambiente todo por aqui mesmo, para o caso de atualizações serem feitas na montagem/desmontagem do servidor caseiro.

Para as instalações bastou usar o subprocess e executar a ferramente de gerenciamento de instaláveis.

As exceções são o Homebrew e o CasaOS que tem seus próprios bash scripts.

## Montagem do container/vm com Colima

Nesse ponto foram considerados os pontos a seguir:

1 - E se quiser rodar um container com outro nome? - Que no caso do Colima é chamado *profile*

2 - Como determinar as especifíções do ambiente para que já seja montado num padrão considerado adequado?

3 -  Como saber se um container já existe e está rodando?

### 1 & 2

O *profile* é facilmente determinado com o parâmetro --profile.

As especificações foram explicitadas diretamente no comando usando os parâmetros: 

* --cpu
* --memory
* --disk
* --network-address
* --vm-type

Como alternativa o jarbas.py poderia chamar `colima template` que permite editar o arquivo default.yaml utilizado pelo Colima nas criações sem parâmetros no terminal.

### 3

A saída do comando `colima list` é o suficiente para determinar uma série de informações e uma simples quebra de string com loop resolve isso. Segue a saída do comando.

|PROFILE|STATUS|ARCH|CPUS|MEMORY|DISK|RUNTIME|ADDRESS|
--- | --- | --- | --- | --- | --- | --- | --- | ---
|casaosenv|Running|x86_64|4|8GiB|10GiB|docker|192.168.64.2|

{% highlight python %}
def colima_profile_exists(profile_name: str) -> bool:
	try:
		result = subprocess.check_output(['colima', 'list'], text=True)
		lines = result.strip().split('\n')
		# Skip header line
		for line in lines[1:]:
			columns = line.split()
			if columns and columns[0] == profile_name:
				return True
		return False
	except Exception as e:
		print(f"Error running colima list: {e}")
		return False
{% endhighlight %}

## Finalizando com o CasaOS no Colima

Essa parte foi a mais difícil dentre todo o restante, o desafio? Rodar um comando ssh e dentro do container executar o bash script do CasaOS.

Muita leitura de documentação, tentativa e erro e o bom e velho "entra do fusca, sai do fusca", consegui encontrar a solução.

{% highlight python %}
subprocess.run(['colima','ssh','-p',env_name], 
input='curl -fsSL https://get.casaos.io | sudo bash', 
stdout=subprocess.PIPE, text=True, stderr=subprocess.PIPE)
{% endhighlight %}

Parece simples, o pulo do gato foi usar o parâmetro input da função run do subprocess. 

E porque não isso não foi fácil? Porque a sessão do ssh é iniciada para que um humano interaja e não para que automações sejam feitas, e para usar um cliente de ssh do Python seriam necessários os parâmetros de segurança, usuário/senha/chave, sendo assim no fim foi possível simplificar e usar somente o subprocess evitando essa complexidade desnecessária para o caso em questão.

# Extra

Uma vez que o ambiente é acessado via IP, adicionei a função get_colima_ip para fornecer como resultado o valor ao fim do processo todo, sabendo assim por onde o CasaOS responde.

Isto poderia ser feito novamente pelo comando `colima list`, no entanto utilizei regex no comando `colima status "profile"` para praticar um pouco mais.

{% highlight python %}
def get_colima_ip(profile_name: str) -> str:
	try:
		result = subprocess.run(['colima', 'status', profile_name],
		 text=True,stdout=subprocess.PIPE, stderr=subprocess.PIPE)        
		match = re.search(r'address:\s*([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)',
		 result.stdout or result.stderr)
		if match:
			return match.group(1)
		else:
			print("IP address not found in output.")            
	except Exception as e:
		print(f"Error running colima status: {e}")
	return ""
{% endhighlight %} 

# Conclusão

Com os scripts do Jarbas pode-se experimentar livremente de dentro do container e até tornar o ambiente todo inutilizável. Basta rodar `python3 jarbas.py -destroy` e `python3 jarbas.py -setup_casaos` e um novo ambiente estará pronto para novos experimentos.

Acesse o resultado completo no meu perfil do [Github](https://github.com/vnavarro/colima_casaos)

# Próximos passos

Provisionamento do ambiente evitando perder bons resultados que precisam estar presentes após a montagem do CasaOS.

# Referências

* [Bash](https://www.gnu.org/software/bash/).
* [Python](https://www.python.org/).
* [Homebrew](https://brew.sh/).
* [Docker](https://www.docker.com/).
* [Colima](https://github.com/abiosoft/colima).
* [Documentação do subprocess](https://docs.python.org/3/library/subprocess.html).
* [FAQ](https://github.com/abiosoft/colima/blob/main/docs/FAQ.md#can-config-file-be-used-instead-of-cli-flags) do Colima.
* [Junian - How to Install CasaOS on macOS](ttps://www.junian.net/tech/macos-install-casaos/).
* [Página principal do CasaOS](https://casaos.zimaspace.com/). 