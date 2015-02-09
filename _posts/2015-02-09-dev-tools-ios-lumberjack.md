---
layout: post
title:  "[DevTools] Logging on OSX/iOS with CocoaLumberjack"
date:   2015-02-09 14:00:00
categories: devtools logging
tags:
  - cocoalumberjack
  - devtools
  - log-in-ios/osx
---
It's not uncommon that a developer has a stack of tools, in fact is quite common to see multiple stacks of choice for each different set of technologies.  
I find it to be curious that we aren't used to share and discuss the whole stack, from our machine, through the programming language, to the server configuration, there are lots of handful decisions, tricks, new tools, and all sort of hidden knowledge locked in the dark corners of our heads.


![CocoaLumberjack's logo](https://github.com/CocoaLumberjack/CocoaLumberjack/raw/master/LumberjackLogo.png)  


So here I bring to you [CocoaLumberjack](https://github.com/CocoaLumberjack/CocoaLumberjack) a logging framework for OSX/iOS. This small log framework has the purpose of working as a replacement to NSLog, for that to be true they have some points I agree being strong:


* Better performance, [check here](https://github.com/CocoaLumberjack/CocoaLumberjack/blob/master/Documentation/Performance.md)
* Allows customization for multiple loggers and formatters
* 5 default log levels they proved to be enough for me
* Allows file logging and easy debug/release configuration
* Is Open Source

###Why should I use it?

Logging can be a pain in the ass some times and is quite important to help you understand what is happening in intriguing bug/crash cases, also it can be a powerful ally for unit tests if done correctly.

A log framework like CocoaLumberjack can help solving your problem taking the logging burden from our backs.

Still need an example? Try their nice [dynamic log levels page](https://github.com/CocoaLumberjack/CocoaLumberjack/blob/master/Documentation/DynamicLogLevels.md)

###Quick demo

First you need to install it, add it to your PodFile with:```pod 'CocoaLumberjack'```

> Don´t know what Cocoapods is? [Try nshipster post](http://nshipster.com/cocoapods/)

Then add this to prefix file
{% highlight Objective-C %}
#import <CocoaLumberjack/CocoaLumberjack.h>
{% endhighlight %}

> Don´t have a pch file? [Check this tip](https://gist.github.com/vnavarro/34fec19ecb6f7c5c2cc2)

Now you have to initialize the loggers, in AppDelegate.m do the following
{% highlight Objective-C %}
//This way we have debug/release config - piece of cake
#ifdef DEBUG
static const DDLogLevel ddLogLevel = DDLogLevelVerbose;
#else
static const DDLogLevel ddLogLevel = DDLogLevelError;
#endif

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
  //Apple System Logger
  [DDLog addLogger:[DDASLLogger sharedInstance] withLevel:ddLogLevel];
  //Console logging - Xcode normally
  [DDLog addLogger:[DDTTYLogger sharedInstance] withLevel:ddLogLevel];
}
{% endhighlight %}

Ready to go, just call one of the 5 log level macro or you own whenever you want to, like this
{% highlight Objective-C %}
DDLogInfo(@"Log with lumberjack")
DDLogError(@"Work this way too:%@ nice:%u", var1, var2);
{% endhighlight %}

Wondering about the 5 levels?  


* DDLogError
* DDLogWarn
* DDLogInfo
* DDLogDebug
* DDLogVerbose
