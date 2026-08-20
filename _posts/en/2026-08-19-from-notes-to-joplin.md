---
layout: post
comments: true
title:  "Migrating from Notes/Evernote to Joplin"
date:   2026-08-19 16:00:00 -0300
description: ""
categories: 
  - development
  - caixa de chocolates
tags: [opensource, development, app migration, alternatives, note taking, joplin]
katex: true
mermaid: true
lang: en
---

I decided that was time to get free from Apple's Notes after chatting about references manager (which will have their moment), and with the focus on my cicle of migration from software/platforms to other that are more honest/fair and if possible open source.

The truth is that this is my second migration on note taking, I had to quit Evernote which was already to limiting in its free account and when I lost access to a bunch of notes. I exported everything I could to Notes and never went back to Evernote. I was now hostage to Notes and orphan of a better solution.

Getting free from Notes I could get back to use a good note app. One of my goals was to be capable of storing my files in other places other than the software owner's server, usually mandatory, like iCloud or Evernote servers.

In a DuckDuckGo search, yep I do avoid Google, I found out [this post](https://www.opensourcealternatives.to/blog/best-open-source-note-taking-apps) from Open Source Alternatives with some interesting comparison.

The first option would be [Notesnook](https://notesnook.com/), some sort of direct replacement for Evernote. By the end of the reading I stumbled upon Joplin which with its markdown based editor pleased me a lot since I've used it for notes, documents and even my site.

Following is some marketing of mine on how Joplin can be amazing:

Math and chemistry formulas. Supported via [KaTeX](https://katex.org/docs/supported).

$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

[Mermaid](https://mermaidjs.github.io/) diagrams.
<pre class="mermaid">
graph TD;
    Novos_Hobbies-->Cantar;
    Novos_Hobbies-->Crochet;
    Cantar-->Pop;
</pre>

Music sheets with [ABC](https://en.wikipedia.org/wiki/ABC_notation).

Where this:
```
```abc
T: Brilha Brilha - começo
M:4/4
AAee|gge|ddcc
```

Becomes that:

![](/assets/img/abc_sample.png)

Beyond those points there is Joplin Cloud for storage and file sync, which is somehow cheap. And as it allows connecting to other storage alternatives - Dropbox, NextCloud, OneDrive, S3 and WebDAV - made my choice easier on picking it.

Its not that the other options in the list don't allow for other types of storage, the reasoning here is that Joplin features with its solid software existing since 2016 makes sense to me. Its important to look for options that is logical to each one of you.

Lastly are the many plugins which will be covered at some point if/when something usefull is found.

## Start here if you just want to install and use it

To install follow their guidance [here](https://joplinapp.org/help/install/) by picking a platform (win, mac, linux, mobile).

Next comes the notes migration, there is a very easy to use group of guides in the site. My sequence was the following:

1 - install [Exporter](https://apps.apple.com/us/app/exporter/id1099120373?mt=12).  
2 - Use Exporter to export my notes from Apple Notes.  
3 - Open Joplin and do the import for the generated folder, follow [this](https://joplinapp.org/help/apps/import_export/#importing-from-markdown-files).  
4 - Done, the folders should now be part of Joplin.

For the sync I've connected my free [Dropbox](https://joplinapp.org/help/apps/sync/dropbox/) account, now computer and phone are synced.

Easy and painless, I'm now free of Notes and iCloud for this part at least.

By the way, this very post was already written in Joplin 💖✌🏽.