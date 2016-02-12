---
layout: post
comments: true
title:  "[QuickTips] Ensure that html tag attribute exists and isn't empty"
date:   2015-10-27 20:26:00
categories: jquery selector
tags:
  - jquery
  - selector
  - quicktips
---

Javascript is a language with thousands of frameworks and together with them are
 thousands of solutions to solve our problems and improve our code bases.

Suppose that built your page giving ids for tags with the goal to identify portions
of your page. Now your client asks you to update given tags with specific ids
with some clever behavior, but the question is that some of them may not be present
since your page is built dynamically based on server data.

{% highlight html %}
<div id="container">
  <div id="58497PRID">....</div>
  <div id="5845697PRID">....</div>
  <div>....</div>
  <div id="5847PSID">....</div>
  <div id="">....</div>
</div>
{% endhighlight %}

Now if you're able to use JQuery, which was my case, you can use a selector to
evaluate the attribute value and fetch the non-empty ones. Even further you can
also ensure that the tag has the attribute.

Given any js code you can do

{% highlight javascript %}
$("[id!=''][id]");
{% endhighlight %}

First part `[id!='']` demands for tags in which id has some value when
 exists but doesn't require the tag to have the id attribute.
The second part `[id]` demands tags which have the id attribute but doesn't care
about its value.

Combined they fetch only tags that **have** the id which values **aren't empty**.

In that sample above, using the following selector

{% highlight javascript %}
$("#container [id!=''][id]");
{% endhighlight %}

We would obtain the following object with three divs

{% highlight javascript %}
Object { 0: <div#58497PRID>, 1: <div#5845697PRID>, 2: <div#5847PSID>, length: 3, prevObject: Object, context: HTMLDocument → index.html, selector: "#container [id!=''][id]" }
{% endhighlight %}

This can be seen [here](http://api.jquery.com/attribute-not-equal-selector/), in
JQuery's documentation.
