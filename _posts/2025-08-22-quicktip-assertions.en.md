---
layout: post
comments: true
title:  "[QuickTips] Assertion guidelines"
date:   2025-08-22 10:00:00 -0300
description: ""
category: Development
tags: [quicktips, development, assertions, programming]
---

I believe the use of assertions is very important during the software development process. It prevents //TODOs from becoming just a memory sent to the code repository and forever deposited on the shelf.

This is so emblematic that it reminds me of my time at DasDad when my college friends and I literally created a Trello column called "Fridge" where we could display "forgotten" tasks. It would be funnier if it weren't also tragic.

In this regard, assertions somewhat prevent this from happening by triggering an error and/or crash in your program right in front of you during execution, forcing that part of the code to be fixed.

Unlike exceptions, which are intended to warn of unexpected logic and execution errors and to be handled in code, assertions are placed by us programmers to warn each other of situations that shouldn't happen and need to be fixed/implemented.

Then comes one of lots of problematic possibilities I've encountered in several situations: silent assertions, those that are subverted away from the glaring error in red in the IDE and sent to some new corner, such as a logging system, metrics system, or some other analysis system. We're back to the "Fridge" schema.

Here comes the advice, in this case a list of them, a guide that aims to direct the use of assertions in order to avoid the tangle of possible problems that arise from, let's say, unrestrained use of the tool.

Yes, use it.
- There is a point at which the code shouldn't fail. It's not an expected error/exception, but rather a specific case, perhaps unlikely to occur, but if it does occur, it needs to be fixed as soon as possible.
- A new feature not yet implemented that will be later, recorded in the task list, and whose assertion would not be sent to production. 
- A code flow where you don't want a try/catch to handle that case, but rather someone (perhaps you yourself) to implement the solution soon.
- Warn about interfaces/protocols that should be implemented to prevent them from being forgotten.
- Debugging code flows where it's best to cause a halt/break in the program to better identify the problem(s).

No, avoid it.
- Regular code or debug logging. For this, each language has print/log functions.
- Logging events in metrics/logging systems.
- Logging silent crashes. Strong inclination to be forgotten.
- Forgetting to remove debugging asserts.
- As code flow control.

When in doubt, avoid it, and before you start using tons of asserts, have an open discussion with team members.

This article is opinionated based on my work experiences and my reality, it is not written in stone nor a law, so I hope it helps to form your idea of ​​how to better use asserts, regardless of whether you follow what I say or not.