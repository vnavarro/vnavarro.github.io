---
title: "[QuickTips] One way to simplify theming your Apps"
description: The need of themes is part of a developer's life, here I present a way of using multiple themes in iOS with Swift.
date: 2021-05-30 19:24:00
image: 'assets/img/08.jpg'
category: 'Development'
background: '#353b48'
---

Is not uncommon to create apps that are similar or even work in apps that apply different layouts, be the reason cultural adaptation, accessibility, dark vs light theme, etc. No matter the reason you would be creating mechanisms for allowing your app to quickly changing between layouts, a well-architected code may be the difference between success and subsequent refactoring or even worse total garbage code that someone will question "may we drop this and start anew?".

Sure there are multiple ways of approaching this issue and the solution I'm proposing here may not fit every project needs, still is an idea that worked really well in some projects I worked with and may be helpful to get other projects going in the right direction or at least start the discussion about it.

Following is the solution with a mix of protocols and classes, which is robust enough to allow for future growth.

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

Adding another theme called **AlternativeTheme** is easy given the base structure above.

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

Great right? Yes, indeed it is. Still, I dislike the usage of init on those custom themes and I prefer using a protocol to define the **Theme** and delegate setting the current theme instance to another design structure. So how did I refactored it?

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

Neat! But one would ask what about fonts? Should they be themed too? Well, that depends on how you desire your theming system to work. Considering that as a requirement, one option could be something like the following additional code.

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

Now we just need to add those to the Theme and update everything else accordingly.

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

Why isn't **FontStyle** declared inside Theme classes like **ColorPalette**? In this case just for the sake of simplicity. To final points, off we go!

1 - With this simple **AppTheme** schema we may create apps that easily change in style;

2 - We also can create white label projects faster, and;

3 - If we have a project in which the backend determines the selected theme we could simply tie it to our class name and change **AppTheme.current** after parsing JSON.

Next challenge: use **UIFontDescriptor** for font traits definition instead of hardcoded font name.