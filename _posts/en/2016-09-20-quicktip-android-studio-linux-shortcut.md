---
layout: post
comments: true
title:  "[QuickTips] Android Studio shortcut on Linux"
date:   2016-09-20 09:00:00
category: Development
tags: [quicktips, development, mobile, android, linux, config]
---

I enjoy using terminal, I really do, yet sometimes having a visual shortcut when using an OS may be a nice perk.

In the case of applications that helps avoiding a myriad of open terminal windows holding execution of each software you're currently running.

So without further waiting, here are the necessary steps:

1. open terminal
2. create new .desktop file: $touch android-studio.desktop
3. edit it: (vim/gedit/anytexteditor) android-studio.desktop

{% highlight bash %}
[Desktop Entry]
Version=1.0
Type=Application
Name=Android Studio
Exec="/pathto/Android/android-studio/bin/studio.sh" %f
Icon=/pathto/Android/android-studio/bin/studio.png
Categories=Development;IDE;
Terminal=false
StartupNotify=true
StartupWMClass=jetbrains-android-studio
Name[en_US]=android-studio.desktop
{% endhighlight %}

4. Save it and you're done with it

*Optional step:*

If your distribution has a launcher instead of placing your .desktop file inside the Desktop folder move it to the local applications folder: `mv /pathto/app.desktop ~/.local/share/applications/`

This will do the trick
