function example() {
  console.log("hello world");
}

function init() {
  console.log("Hello from the init");
  example();
}

window.onload = init;
//executes first, and is a "parent" then, effecting execution order
//force the html and css to resolve before i execute the logic
