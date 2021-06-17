---
title: "[QuickTips] Uma forma de simplificar temas nos seus Apps"
description: A necessidade de temas é parte da rotina de um desenvolvedor, apresento então uma forma de utilizar múltiplos temas no iOS com Swift.
date: 2021-05-30 19:24:00
image: 'assets/img/08.jpg'
category: 'Development'
background: '#353b48'
---

Não é incomum criar aplicativos que são muito similares ou até trabalhar em alguns que aplicam diferentes layouts, seja por razões de adaptação cultural, acessibilidade, tema escuro/claro, etc. Não importando a razão, você estaria criando mecanismos para permitir seu app mudar rapidamente entre esses layouts e um codigo bem arquitetado pode ser a diferença entre o sucesso e refatorações subsequentes, ou até pior, um lixo completo de código que alguém irá questionar "podemos jogar isso fora e começar novamente?".

Com certeza existem diversas formas de atacar esse problema, e a solução que estou propondo aqui pode não se encaixar em todo e qualquer requisito de um projeto, ainda assim é uma idéia que tem funcionado muito bem em projetos que trabalhei e pode ser de ajuda valiosa para posicionar projetos na direção correta ou ao menos iniciar uma discussão sobre tal necessidade.

Abaixo temos a solução com um mix de protocolos e classes, é robusta o suficiente para permitir crescimentos futuros.

```SWIFT
class Theme {
    public static var current: Theme = DefaultTheme()
    var palette: ColorPaletteProtocol!

    public static func setTheme(theme: Theme) {
        self.current = theme
    }
}
protocol ColorPaletteProtocol {
    var primary: UIColor { get set }
    var neutral: UIColor { get set }
    var secondary: UIColor { get set }
    var highlight: UIColor { get set }
}

class DefaultTheme: Theme {
    override init() {
        super.init()
        palette = ColorPalette();
    }

    class ColorPalette: ColorPaletteProtocol {
        var primary: UIColor = UIColor.cyan
        var neutral: UIColor = UIColor.magenta
        var secondary: UIColor = UIColor.yellow
        var highlight: UIColor = UIColor.black
    }
}
```

Adicionar um segundo tema chamado **AlternativeTheme** é fácil dado a estrutura anterior.

```SWIFT
class AlternativeTheme: Theme {
    override init() {
        super.init()
        palette = ColorPalette();
    }

    class ColorPalette: ColorPaletteProtocol {
        var primary: UIColor = UIColor.red
        var neutral: UIColor = UIColor.blue
        var secondary: UIColor = UIColor.green
        var highlight: UIColor = UIColor.white
    }
}
```

Sensacional, certo? Sim, com certeza é. No entanto eu não sou fã desses inits nos temas e prefiro usar protocol para definir o **Theme** e delegar o gerenciamento do tema atual para uma outra estrutura de design. Como refatorei então?

```SWIFT
protocol Theme {
    var palette: ColorPaletteProtocol { get set }
}

class AppTheme {
    static var theme: Theme = DefaultTheme()
    static func setTheme(theme: Theme) {
        self.theme = theme
    }
}

class DefaultTheme: Theme {
    var palette: ColorPaletteProtocol = ColorPalette()

    class ColorPalette: ColorPaletteProtocol {
        var primary: UIColor = UIColor.cyan
        var neutral: UIColor = UIColor.magenta
        var secondary: UIColor = UIColor.yellow
        var highlight: UIColor = UIColor.black
    }
}

class AlternativeTheme: Theme {
    var palette: ColorPaletteProtocol = ColorPalette()

    class ColorPalette: ColorPaletteProtocol {
        var primary: UIColor = UIColor.red
        var neutral: UIColor = UIColor.blue
        var secondary: UIColor = UIColor.green
        var highlight: UIColor = UIColor.white
    }
}
```

Ainda poderia, por exemplo, surgir uma questão sobre fontes? Deveriam ficar nos temas também? Bom, isso depende da sua vontade e das necessidades do sistema de temas. Considerando esse ponto como um requisito uma opção poderia ser algo como o código a seguir.

```SWIFT
protocol FontStyles {
    var heading: UIFont { get set }
    var body: UIFont { get set }
    var caption: UIFont { get set }
    var quote: UIFont { get set }
}

struct DefaultFontStyles: FontStyles {
    var heading: UIFont = UIFont(name: "TrebuchetMS-Bold", size: 14)!
    var body: UIFont = UIFont(name: "TrebuchetMS", size: 12)!
    var caption: UIFont = UIFont(name: "TrebuchetMS-Italic", size: 11)!
    var quote: UIFont = UIFont(name: "TrebuchetMS-BoldItalic", size: 11)!
}
```

Com isso só precisamos atualizar o **Theme** e o restante de acordo.

```SWIFT
protocol Theme {
    var palette: ColorPaletteProtocol { get set }
    var fontStyles: FontStyles { get set }
}

class DefaultTheme: Theme {
    var fontStyles: FontStyles = DefaultFontStyles()
    var palette: ColorPaletteProtocol = ColorPalette()
    ...
}

class AlternativeTheme: Theme {
    var fontStyles: FontStyles = DefaultFontStyles()
    var palette: ColorPaletteProtocol = ColorPalette()
    ...
}
```

Porque o **FontStyle** foi declarado fora das classes customizadas de Theme? Nesse caso foi apenas pela simplicidade. Partiu pontos finais!

1 - Com essa simples mecanica do **AppTheme** podemos criar apps que mudam facilmente de estilo;

2 - Podemos também criar projetos *white label* mais rapidamente, e;

3 - Se tivermos um projeto em que o *backend* determina o tema selecionado, a troca pode ser feita através do nome do tema, sendo esse o nome da classe com uma simples mudança no **AppTheme.current** após fazer a leitura do JSON.

Próximo desafio: usar o **UIFontDescriptor** para a definição de *traits* ao invés do nome da fonte chumbado no código.