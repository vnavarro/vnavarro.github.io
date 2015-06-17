---
layout: post
title:  "[DevTools] Alternatives to cross-platform on mobile: j2ObjC"
date:   2015-06-16 11:44:00
categories: cross-platform j2objc
tags:
  - cross-platform
  - j2objc
---
From time to time adding new options to back your solutions and ideas is a good practice and may also be refreshing.

Building apps for multiple platforms with great quality and user experience is a hard work, and most of the times we dump traditional solutions like PhoneGap or Appcelerator Titanium in their favor.

Is not that those tools don't work, but building hybrid applications is a dangerous field and there is a time and place for everything.

> User the right tools for the job.

Between so many options the open source world brings to us there is this one from Google that stands out. To make things more productive when building Inbox/Sheets app for iOS Google decided to have the common portions of the code come translated from Java's source[^1] using a code translation tool, guess what? Created by themselves to solve this issue.

To the rescue comes j2ObjC[^2] and with it new responsibilities and possibilities.

Does it translate even your UI code? No! j2ObjC goal is not UI is on logic layers only, which is great!

With it, we are able to build a clever logic library in Java and test proof it on Android and also translate it finally using the result on iOS project.

Not everything is a paradise.

Although the project is used by Google itself in real products it is in beta stage, as many others from the Open Source world. So that means:

* Bugs, maybe many them.
* Problems using it.
* Not as good as it could be documentation.
* Lack of technical material from the community. Tutorials and alike.

And before you think ignoring it, **don't**, I have been using the project during the past few months and its development is quite active as is issues resolutions and community communication. Furthermore, it thrives where others have failed for me:

* It's kind of easy to use, compare it to C++ setup/config and this is a win situation.
* Solves your problem if you have lots of business code that can be shared across  platforms, but also when this code is shared across apps.
* Well know environment and language, that is especially good if you have a team with all kinds of different skills.

<div style="text-align:center">
<img width="200px" src="http://s2.quickmeme.com/img/6a/6acbf45c7fde7f40efb6f1561cd52d0eb62f70dff22602e3e096d215a7e79e84.jpg">
</div>

## Conclusion

It's a good open source tool to help us in cross-platform applications development maintained by one of the biggest tech companies, I think the least we can do is take a peek and check if would solve our problems. Worth checking!

> Pro tip: consider collaborate to project evolution, as open source projects give so much they should also receive back.

[^1]: [Going under the hood of Inbox ](http://gmailblog.blogspot.com.br/2014/11/going-under-hood-of-inbox.html)
[^2]: [j2ObjC site](http://j2objc.org/)
