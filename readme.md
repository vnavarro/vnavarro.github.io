# Summary

Just information so I can recall how I did what I did and why. Also allowing anyone to understand and use it as example.

## Software

I'm using [Jekyll](https://jekyllrb.com/) as site framework and Github as the host itself. There is a [Cloudflare](https://www.cloudflare.com/pt-br/) account pointing everything to the right place so I can use proper domain naming.

## Theme

The MIT Licensed theme of choice is [So Simple Theme](https://github.com/mmistakes/so-simple-theme).

## Plugins

[Jekyll Compose](https://github.com/jekyll/jekyll-compose) for handfull post management via cmd.

With compose plugin there is a configuration under config.yml (jekyll config) that sets defaults for each post header like the following:

```
---
layout: post
title: Testing compose
date: 2025-03-21 18:04 -0300
description: 
image: 
category: 
tags: 
---
```

## Usage

Useful commands: 

- Use `bundle exec` before any jekyll command for proper ruby version.
- `jekyll serve` runs the server locally.
- `jekyll post` for the handy compose plugin usage.