---
layout: post
title:  "[A programmer's journey] Rust quest - day 4"
date:   2015-05-04 23:22:00
categories: journey rust
tags:
  - journey
  - rust
---
Continuing our journey lets try more on functions, until now they were plain simple, we just had the main sample.

{% highlight rust %}
fn main(){
 //Some code, yup comments in Rust uses //
}
{% endhighlight %}

Now what about those nice arguments? Here they are.

{% highlight rust %}
fn the_number_is(x: i32){
    println!("x: {}", x);
}

fn the_numbers_are(x: i32, y: i32){
    println!("x: {}, y: {}", x, y);
}
{% endhighlight %}

Can I omit parameters types? Nope, they are mandatory.

> A little bit contraditory since we have type inference for other parts of the code, still it's a good practice decision from Rust's team to keep things this way.

What if I want to return some value? Well that is not so hard either, we use *-> type* after parameters declaration.

{% highlight rust %}
fn sum(x: i32, y: i32) -> i32{
    x+y
}
{% endhighlight %}

DO NOT ADD ; when returning expression values.

> Remember day 3 post where we talked about statements and expressions? The thing is we should return the expression value and ; transform the line in a statement, statements don't return values

There is one exception, when using return keyword, which tells Rust to use expression value as the return value, so the following code would be the same as the previous.

{% highlight rust %}
fn sum(x: i32, y: i32) -> i32{
    return x+y;
}
{% endhighlight %}

## Quest closing

We almost got through the basics to grasp the tip of the iceberg, next dungeons we will conquer are: types and loops.

Oh and before you go, remember  

![](https://dl.dropboxusercontent.com/u/14137502/site/maythe4th.jpg)  
