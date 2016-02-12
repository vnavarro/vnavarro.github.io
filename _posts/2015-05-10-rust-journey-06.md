---
layout: post
comments: true
title:  "[A programmer's journey] Rust quest - day 6"
date:   2015-05-10 11:40:00
categories: journey rust
tags:
  - journey
  - rust
---
For us to go further and start creating sample solutions in Rust extending to
its parts that we don't know yet we must finish the basics side quests.

In this side quest our mission is to check loops, for loops are almost similar
among programming languages but there are differences thus worth our time to see
what is at our disposal.

#### For the win

Rust's for loop is different than C++ and similar to Ruby for instance.
C++:  

{% highlight cpp %}
for( int a = 10; a < 20; a += 1 )
{
  cout << "value of a: " << a << endl;
}
{% endhighlight %}  

Ruby:  

{% highlight ruby %}
for i in 0..5
  puts "#{i}"
end
{% endhighlight %}  

> Curiosity: Ruby has a lots of [ways](http://www.tutorialspoint.com/ruby/ruby_loops.htm) to iterate on things

{% highlight rust %}
for x in 0..10 {
    println!("{}", x);
}
{% endhighlight %}  

The for receives the var (x) to hold the iterator (0..10) value in each iteration.
Also our iterator is retrieved through an expression, in this case 0..10, which
means from 0 to 9, since is an exclusive expression.

Why we don't have the more common way with index? The idea is to allow a safer
way instead of a myriad of options.

#### we could do this for a While

The other way of iterating in Rust is using while, which in this case is pretty
much the same old while. The code bellow is just a sample, we could achieve the
same using for.  

{% highlight rust %}
let mut keepRunning: bool = true;
let mut currentSpeed: i32 = 0;

while keepRunning {
  currentSpeed += 2;  
  if currentSpeed == 10 {
    keepRunning = false;
  }
}
{% endhighlight %}  

When building game engines normally we have the game loop that runs forever. In
this case we use the loop keyword, but before we go to the code sample let's
also add two keywords: break and continue.  
They do exactly as they told, break stops an loop execution (while, for, loop)
whilst continue skip to next iteration ignoring whatever comes after him.  

{% highlight rust %}
let mut isGameRunning = false;
loop {
    // something happens and thus game stops running
    if isGameRunning == false { break; }
}
{% endhighlight %}  

> Tip: in forever running situations we should always use the keyword loop,
Rust compiler is prepared for that situation if we stick to the rule.

### Quest closing

With for, while and loop in our spells tree we can now go to the last barrier
before we start building things altogether with learning Strings (piece of cake).
