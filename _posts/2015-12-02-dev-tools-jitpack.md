---
layout: post
title:  "[DevTools] Importing non-gradle projects: JitPack"
date:   2015-10-27 20:26:00
categories: tools java jitpack
tags:
  - tools
  - jitpack
  - java
---

When comes down to using dependencies in Java/Android projects, Gradle is, at the writing of this post, the most useful tool around.

*Great! My project is set with it and now I want to sync some projects as dependencies.*

*Oh... wait a second, what if the project I need is not hosted somewhere Gradle can access?*

> Typically Maven[^1] is used to host Java projects

If the projects needed are controlled using either Github or Bitbucket there is a great solution that comes to developers aid: [JitPack](https://jitpack.io/).

This service transformed this problem almost in ashes, configure your project build.gradle with its url and add the dependencies using his expected format, this is all you need to hit the ground running.
```
repositories {
        // ...
        maven { url "https://github.com" }
}

dependencies {
        compile 'com.github.User:Repo:Tag'
}
```
To use the service there is a free layer which allows itself for public repos, yet for private repos there are other payed layers, not much of a hassle.

In the end, I found it to be an excellent and fair addition to a developers' toolbelt solving our problems in an easy and elegant way.

### Small issue

They plan to release a version which work with repos that are hosted in custom git structures, like Google's Volley library.

[^1]:[Bintray](https://bintray.com/) from JFrog hosts java projects to be fetched by maven, gradle and other types of dependency managers in Java.
