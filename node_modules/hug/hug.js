var hug = module.exports = function(fun, context, before, after) {
  return function() {
    if (!arguments.length) return runSync(fun, [], context, before, after);
    var lastArg = arguments[arguments.length - 1];
    if (typeof lastArg === 'function') return runAsync(fun, arguments, context, before, after);
    runSync(fun, arguments, context, before, after);
  };
};

function runSync(fun, args, context, before, after) {
  if (before) before();
  var start = Date.now();
  if (context) {
    fun.apply(context, args);
  } else {
    fun.apply(null, args);
  }
  var duration = Date.now() - start;
  if (after) after(start, duration);
}

function runAsync(fun, args, context, before, after) {
  var callback = args[args.length - 1];
  if (before) before();
  var start = Date.now();

  // Wrap the callback in order to call the after function
  args[args.length -1] = function() {
    var duration = Date.now() - start;
    if (after) after(start, duration);
    callback.apply(null, arguments);
  };

  if (context) {
    fun.apply(context, args);
  } else {
    fun.apply(null, args);
  }
}
