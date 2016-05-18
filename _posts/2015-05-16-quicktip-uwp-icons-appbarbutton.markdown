---
layout: post
comments: true
title:  "[QuickTips] Universal Windows Platform - Using Icons with AppBarButton"
date:   2016-05-16 20:26:00
categories: quicktips uwp icons AppBarButton
tags:
  - quicktips
  - uwp
  - Icons
  - AppBarButton
---

**Hey listen!** First post with Windows apps development subject, more specifically speaking UWP development. Since Windows 10 things got mixed. Well, let's get to the point...

Windows development has it's pros and cons, and definitely using font icons and symbols to create sweet buttons is awesome, here goes some pros:

* Follows platform design style
* Makes user interface creation a little less troublesome
* Decreases app size

And a downside is having to find the code for the desired icon in the font family, we have character map to help, still is not that fun to do.

> Pro tip: just hit windows key and type character map

In the code bellow I used a [FontIcon](https://msdn.microsoft.com/library/windows/apps/dn279514) instance with default font configured for that project, yet you may specify a font family.

{% highlight csharp %}
FontIcon infoIcon = new FontIcon();
infoIcon.Glyph = "\uE946"; //Insert here any font code

AppBarButton button = new AppBarButton();
button.Icon = infoIcon;
//Add it to a command bar or to a custom control
{% endhighlight %}

Another nice way of inserting an icon is to use pre-defined symbols with the [SymbolIcon](https://msdn.microsoft.com/library/windows/apps/dn252842) class, it uses Segoe MDL2 Assets fonts as source, to find a symbols one just look up in the font file or bookmark [Symbol enum](https://msdn.microsoft.com/library/windows/apps/dn252842) documentation.

{% highlight csharp %}
AppBarButton button = new AppBarButton();
button.Icon =  new SymbolIcon(Symbol.Help);
//Add it to a command bar or to a custom control
{% endhighlight %}

> Pro tip: this can be done to TextBlock and other controls, not exactly the same, place &#xCHARHEX; i.e. `&#xE946;` in the TextBlock's text property

Before I go is important to leave this tip I found at [Around Computing](https://muibiencarlota.wordpress.com/2015/07/07/segoe-mdl2/) blog. He mentions [MDL2 Helpers](https://metronuggets.com/2015/05/18/introducing-mdl2-helpers/) and [ScottIsAFool/Mdl2Tool](https://github.com/ScottIsAFool/Mdl2Tool) as alternatives for using typed accessors instead of coding your way into it, worth looking.
