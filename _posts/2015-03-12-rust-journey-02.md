---
layout: post
comments: true
title:  "[A programmer's journey] Rust quest - day 2"
date:   2015-03-12 12:18:00
categories: journey rust
tags:
  - journey
  - rust
---
Before continuing through learning Rust I hit a wall, I had everything I need installed last time and it was enough.... right?

**WRONG**! Or at least not so much wrong... the thing with **Nightly Builds** is that they are done, well... nightly. So maybe yesterday you had a perfect good working ecosystem and the next morning everything is chaotic.

So how can I update rust and cargo? It turned out that there is a script called **rustup.sh** maintained by Rustaceans which solves this problem. Courtesy of [Bryce Fisher](https://bryce.fisher-fleig.org/blog/script-to-keep-rust-compiler-updated/)

`curl https://static.rust-lang.org/rustup.sh | sudo sh`

Basically it detects your system (if is supported), download the right tarball and after finishing it extracts it and install the new version (it appears to remove the old one).

Now, moving on...

## Cargo

<div class="post-image-left">
<img src="https://crates.io/assets/Cargo-Logo-Small-233a70e173f628a13c391cb95cf1d70b.png" alt="crates" cover /></div>[Cargo](https://crates.io/) is a package+project manager for Rust that: build your project, download dependencies and build them. The best part is that Rust and Cargo comes as a bundle, install Rust by official means and you get Cargo as a gift, sort of.

<div class="clear_float"></div>

### Convert a project
Create a [Cargo.toml](http://doc.crates.io/manifest.html) file and move your files to folders which Cargo designates them to when created automatically, like *.rs to src folder.
This is the excerpt from crates.io conventions section:

> * Cargo.toml and Cargo.lock are stored in the root of your project.
> * Source code goes in the src directory.  
> * External tests go in the tests directory.  
> * The default executable file is src/main.rs.  
> * Other executables can be placed in src/bin/*.rs.  
> * The default library file is src/lib.rs.

### Creating a project
Just run `cargo new project_name` for libraries and add --bin for programs

### Building and Running
To build (including dependencies) you can execute `cargo build` then to run the target you would `./target/debug/product_name`
If you only desire to compile and run just go `cargo run` to compile and run.

The guide in [crates.io](http://doc.crates.io/guide.html) has much more information, I won't dive deeper on it right now but Cargo.toml is similar to bundler's [Gemfile](http://bundler.io/v1.3/gemfile.html) and Cocoapods' [Podfile](http://guides.cocoapods.org/using/the-podfile.html).

I wanted to show this to you as I'm going to keep using as one of my backpack's main item during our journey.

## Quest's Monsterpedia

**[TOML](https://github.com/toml-lang/toml)**
TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.
