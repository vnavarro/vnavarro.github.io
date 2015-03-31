Continuing our journey through these exciting lands of Rust we're going to unveil variable binding (one can think as it being almost the same thing as normal variables).

Variables in Rust work a little bit different than in other languages, and before we start understanding its inner workings lets have some action.

``` rust
//x is a bind with value five and inferred type int (i32 to be more specific)
let x = 5;
println!("x is {}", x)
//same thing declaring type
let y: i32 = 42;
println!("y is {}", y)
```
Oh common! Only integers? Show me something more fancy!
``` rust
let anArray = [1, 2, 3];
let aString = "Hello String"
```
There are more quests than this day could fit in, so we're going to avoid wandering off and first understand a little better variable binding. On the next days we'll get back to types quest.

## Tricks (features)
### Pattern matching
That means that we can use expression on the left hand side of attribution
``` rust
// a = 10 and b = 3
let (a, b) = (10, 3);
```

### Type inference
Even being statically typed (specify types upfront) if Rust can guess the type then it won't complain about it and will guess it for us. But it can be specified by us as we did previously
`let x: i32 = 27;`

> The options for integers are: i8 i16 i32 i64. The same for unsigned but with an u in the place of the i


### Immutable
By default bindings values can't change after attribution, being [immutable](http://en.wikipedia.org/wiki/Immutable_object) bring some advantages and there are lots of discussions on the subject, here is a good answer at stackoverflow [mutable vs immutable](http://stackoverflow.com/questions/214714/mutable-vs-immutable-objects).

But there is a way of safely declaring mutable bindings, mut keyword enables mutability
``` rust
let mut b: i32 = 12;
println!("b is {}", b); //prints 12
b = 42;
println!("b now is {}", b); //prints 42
```

### Needs initialization before use

When declaring a binding without value the compiler present **only** a **warning**, so `let x: i32;` would show
``` rust
src/main.rs:4:7: 4:30 warning: unused variable: x, #[warn(unused_variables)] on by default src/main.rs:4 let x: i32;
                  ^~~~~~~~~~~~~~~~~~~~~~~
```
Thats ok, but what if we try to use it? then the compiler would gift us with an **error**
``` rust
let x: i32;
println!("error {}", x);
```
```
 Compiling variables v0.0.1 (file:///...) src/main.rs:5:25: 5:48 error: use of possibly uninitialized variable: x src/main.rs:5 println!("error {}", x); ^~~~~~~~~~~~~~~~~~~~~~~ note: in expansion of format_args! :2:43: 2:76 note: expansion site :1:1: 2:78 note: in expansion of println! src/main.rs:5:3: 5:50 note: expansion site error: aborting due to previous error Could not compile variables.
```

## Bônus dungeon - conditionals (if), expressions and statements

### Conditionals (if)

There is no secret on ifs, they are similar to other languages
```
if x == 5 {
  println!("x is five!");
} else if x == 6 {
  println!("x is six!");
} else {
  println!("x is not five or six: {}", x);
}
```
And there is the if attribution
```
let y = if x == 5 { 10 } else { 15 };
```

> This may be also know as if ternary, here is a C# example: `var y = if (x == 5) ? 10 : 15`

### Express it or state it! (expressions and statements)

In Rust *ifs* are expressions, different than other languages in which *if* normally is a statement.

> Simplifying: expressions return a value, statements don't

Rust only have two types of statements and everything else are expressions, this may be hard to get, so check Rust documentation if needed.

One type of statement is declaration statement and until now let is the only thing know to be classified as it (since the others are still to come). This implies, for example, that we can't chain attributions like in Ruby:
```
let x = y = 5 // this works
let x = (let y = 5); //this won't work
```

The other statement type Rust has is the **expression statement***, they turn expressions in statements.

In Rust statements follows other statements, to separate them we use semicolons (;). So each line with ; is a statement.

> "The semicolon turns any expression into a statement by throwing away its value and returning unit instead." by Rust's docs

There are exceptions though, like the if attribution  
`let y: i32 = if x == 5 { 10 } else { 15 };`

But what happens when ; turns an expression into a statement?

Well it ignores any return value of the expression replacing with the *unit* special type, depicted as (). The purpose of *unit* is specially that, to represent an statement.

So in the case of changing the if attribution to  
`let y: i32 = if x == 5 { 10; } else { 15; };`

The compiler would throw an error because the () - *unit* value - is not the of type i32 expected.  
`error: mismatched types: expected i32, found () (expected i32, found ())`

## Quest closing
Ok this may seem like to much, but those ideas will get clear as the travel goes forth.
