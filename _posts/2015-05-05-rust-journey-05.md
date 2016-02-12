---
layout: post
comments: true
title:  "[A programmer's journey] Rust quest - day 5"
date:   2015-05-05 20:18:00
categories: journey rust
tags:
  - journey
  - rust
---
Primitive types, the pillar of our future softwares, they are needed for anything we want to model and represent.

Rust brings to us more than the conventional primitive types, those "primitives" are built-in to the language. For strictly primitives check the [docs](https://doc.rust-lang.org/reference.html#primitive-types)

Following is a quick list with some built-in types and samples.

#### Boolean
{% highlight rust %}
let day5 = true;
let isThisALie: bool = false;
{% endhighlight %}

#### Char
{% highlight rust %}
let coffeeChar = '☕';
let rust: char = 'r';
{% endhighlight %}

#### Numeric Types
{% highlight rust %}
let thisIsI32 = 32;
let pi: f32 = 3.14;
{% endhighlight %}

Every number is declared as its default or using the given set of rules:  

* Any number type is composed of category and size, like in i32, i stands for integer and 32 is its size in bits.
* Signed numbers get the 'i' ahead its size
* Unsigned numbers get the 'u' ahead its size
* If the number is not fixed size, like u8, i32 and f32 then it is a variable size and takes 'size' after the category, so we have usize and isize.

#### Arrays

To store a list of things, lets say magic spells indexes, we can use arrays. They are a fixed size list of elements with same type and are immutable by default (a.k.a you can't change it later).

{% highlight rust %}
let numbers = [42, 26, 87];
let mut letters  = [ 's', 'p', 'e', 'l', 'l', 's'];
{% endhighlight %}

There is a specific type notation for array creation: [T; N], if you guessed [generics](http://doc.rust-lang.org/book/generics.html) from the T them you guessed it right. N by the way is just the compile-time constant for array's size.

So an empty array with size 10 would be created this way:

{% highlight rust %}
let tenSized = [0; 10];
{% endhighlight %}

Worth mentioning tenSized.len() would return 10 and letters[1] would return 'p'.

#### More built-in types

There are three more interesting built-in types covered in Rust's [guide](http://doc.rust-lang.org/book/primitive-types.html), but the idea here is to discover Rust, not to rewrite their docs, with that in mind let's keep it short.

__*Slices*__  
Similar to python implementation, you can get parts of an array without copying it, so &letters[0..2] gets ['s', 'p'], oh and it doesn't wrap so 0..7 would return an length error.

> &str is called string slice and is a more pure form of String

__*Tuples*__  
Ordered heterogeneous lists with fixed sizes. Those fancy words are translated to this:

{% highlight rust %}
let yoda: (&str, &str, i32) = ("the power", "must he have", 1980)
{% endhighlight %}

> You could use the tuple pattern on the right side to binding to different variables at the same time as long as you keep its types and sizes ([arity](http://doc.rust-lang.org/book/glossary.html#arity)) ```let (y, o, d, a) = ('y', 'o', 'd', 'a')```

__*Functions*__  
Yes they have a type, is a little bit odd to read.

{% highlight rust %}
fn foo(x: i32) -> i32 { x }
let x: fn(i32) -> i32 = foo;

fn hello_world(name: &str) { println!("hello world {}", name); }
let hw: fn(&str) = hello_world;
{% endhighlight %}

### Why string is not here?

Strings are fun to play and in being so I think they deserve a full day quest don't you?

### Quest closing

Ok, now we have some tools to play with: cargo, functions, ifs, variable binding and a few types. With this we can cause some damage to the monsters in the dungeons bellow, let's keep delving deep with, next stop loopsland (ok bad joke I know).
