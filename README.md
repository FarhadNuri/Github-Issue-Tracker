# Github Issues Tracker


## Question 1
Var is the old way of declaring variables in JavaScript. It is function scoped or global scoped. If we declare a variable using var inside a block, it can still be accessed outside that block.

Let is the modern way of declaring variables. It is block scoped. That means if a variable is declared inside a block {}, it cannot be accessed outside that block.

Const is also block scoped like let. But the difference is the value of a const variable cannot be changed after it is assigned. It is used when we know the value should stay fixed.


## Question 2
Spread operator is used to copy or expand elements of an array or object.

When we copy an array normally and then add a new element to the copied array, sometimes the change also appears in the original array. This happens because both arrays can share the same reference in memory, so change in one also affects the other.

The spread operator helps to solve this problem. It creates a new copy of the array and spreads all elements into it. So the new array has its own memory and changes in it will not affect the original array.


## Question 3
All three are used to work with arrays.

forEach() is used to loop through each element of an array. It just runs the code for every element but it does not return a new array.

map() is used when we want to change every element of an array and create a new array with those changed values.

filter() is used when we want to select some elements from an array based on a condition and create a new array with those elements.


## Question 4
Arrow function is a short and modern way to write functions in JavaScript. It does the same work as a normal function but the syntax is smaller and cleaner. 
Instead of writing full function keyword, we use =>.

It is mostly used in modern JavaScript especially with things like map(), filter(), and forEach().


## Question 5
Template literals are used to insert variables inside a string easily. Before this we had to use + to join strings and variables. But with template literals we can write the variable inside ${}.

It uses backticks instead of quotes. This makes the code more readable and easier to write.
