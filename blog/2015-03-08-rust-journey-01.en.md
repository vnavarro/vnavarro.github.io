---
title:  "[A programmer's journey] Rust quest - day 1"
date:   2015-03-08 20:15:00
category: Development
tags: [journey, rust, programming languages]
image: assets/img/09.jpg
background: "#353b48"
---
I always loved to learn, I was raised that way, instigated to pursue curiosity and knowledge because it is indeed fun to do it.
Now as a programmer I have some urge from time to time to meet new languages, and this is the turn for Rust.
It's not the first time I do this so I'll try to do something new, that is why you're reading this. Yup I'm building a devlog to guide others during my journey.

##Starting the journey

### About Rust

[Rust](http://www.rust-lang.org/) is a systems programming language and it claims to be **safe** and **fast**, it's still being built and actually may maintain only the concepts when is "done" for the first time.  

To be what they claim to be Rust controls ownership of variables at compile time, has some concurrency features (as Arc and Mutex) and combine language features with compile time error check (e.g. ownership) to leverage speed and safety.


As simplistic as this may appear I hope I can understand all this better during this journey so it will naturally be clearer, but lets go easy on it... baby steps

### Installing Rust

Installation is quite easy, just access Rust site and download the .pkg from Install button. This [link](https://static.rust-lang.org/dist/rust-nightly-x86_64-apple-darwin.pkg) is from their nightly build. Deeper details [here](http://doc.rust-lang.org/book/installing-rust.html)


If you use Sublime there is a [package](https://packagecontrol.io/packages/Rust) with some sweet additions to it.


For vim, emacs and other editors users: is not hard to find things on your favorite search engine, did you tried [DuckDuckGo](https://duckduckgo.com/)?

### The typical Hello world

After installing we can rush to our editor and create a hello.rs file adding the following:

{% highlight rust %}
fn main(){
    println!("Hello world");
}
{% endhighlight %}

And this is quite familiar, a function declaration and a print function, don't you remember seeing this?


There is one important detail here, the ! after println indicate it's a macro, if you want rush to see how macros work in Rust, but lets keep moving.


We have the source and we want to compile it, just open the terminal and run rustc (rust compiler) passing the file.
`rustc hello.rs` will output a main binary file in same folder.


Drats! I want to execute also, ok that is not that bad, just concatenate the next command to run it: `rustc hello.rs && ./hello`


Windows users don't cry now, using Powershell you can do it this way
`rustc hello.rs; hello`


> Remember: As a ahead of time compiled language we can land this bin to someone else and just run in their machine.

### Bonus: Cargo

What of a good programming language that hasn't a good package manager? That is no problem for Rust since it has [Cargo](https://crates.io/)

We're going to talk more about it during next days, but Cargo makes adding dependencies and organising your Rust project easier.

### What's next?

Sincerely? I'm not sure, but get along in this quest and lets see what Rust is made of together!
