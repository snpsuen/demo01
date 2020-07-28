Wrap functions with before and after functions in order to perform measurements. This code is written to work using node callback style and assumes that if the last argument passed to a function is a function, then it is a callback function and the wrapped function is an asynchronous function.

    var hug = require('hug');
    var runCount = 0;

    var after = function(start, duration) {
      console.log('This function took '+duration+' ms to run');
      runCount++;
    }
    var function = someAsyncFunction(callback) {
      // Do Work...
      callback();
    }

    var wrapped = hug(someAsyncFunction, null, null, after);
    wrapped(function() {});

# API
### hug(fun, context, before, after)
Returns a wrapped function

  * ***fun*** - the function to wrap
  * ***context*** - the execution context (this)
  * ***before*** - function() to run before the wrapped function is executed
  * ***after*** - function(start, duration) to run after the wrapped function is executed
    * start is the time when the wrapped function was called
    * duration is the execution time of the wrapped function in ms

Note that while the ***after*** function is called after the wrapped function, it is called before the callback when an async function is wrapped.

# RUN TESTS

    // install mocha
    npm install mocha
    mocha --reporter spec test/hug.js

