'use strict';

var url = require('url');
var isomorphicFetch = require('isomorphic-fetch');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var MORALIS_APPLICATION_ID = process.env["MORALIS_APPLICATION_ID"] || "jlvmvCLbkVYZdgOMeKvYCuK8awZLCQARSLRsVb5o";
var MORALIS_API_KEY = process.env['MORALIS_API_KEY'] || 'V7ocf3uOf3lsa2i3uggAGTrDMjRUogCuzUA2AglySdA9qkO4mYAHxcPbh6NTCD59';

var BASE_PATH = /*#__PURE__*/'https://deep-index.moralis.io/api/v2'.replace(/\/+$/, '');
/**
 *
 * @export
 * @class BaseAPI
 */

var BaseAPI = function BaseAPI(configuration, basePath, fetch) {
  if (basePath === void 0) {
    basePath = BASE_PATH;
  }

  if (fetch === void 0) {
    fetch = isomorphicFetch;
  }

  this.basePath = basePath;
  this.fetch = fetch;

  if (configuration) {
    this.configuration = configuration;
    this.basePath = configuration.basePath || this.basePath;
  }
};
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */

var RequiredError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(RequiredError, _Error);

  function RequiredError(field, msg) {
    var _this;

    _this = _Error.call(this, msg) || this;
    _this.field = field;
    return _this;
  }

  return RequiredError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 *
 * @export
 * @enum {string}
 */

var ChainList;

(function (ChainList) {
  ChainList[ChainList["Eth"] = 'eth'] = "Eth";
  ChainList[ChainList["_0x1"] = '0x1'] = "_0x1";
  ChainList[ChainList["Ropsten"] = 'ropsten'] = "Ropsten";
  ChainList[ChainList["_0x3"] = '0x3'] = "_0x3";
  ChainList[ChainList["Rinkeby"] = 'rinkeby'] = "Rinkeby";
  ChainList[ChainList["_0x4"] = '0x4'] = "_0x4";
  ChainList[ChainList["Goerli"] = 'goerli'] = "Goerli";
  ChainList[ChainList["_0x5"] = '0x5'] = "_0x5";
  ChainList[ChainList["Kovan"] = 'kovan'] = "Kovan";
  ChainList[ChainList["_0x2a"] = '0x2a'] = "_0x2a";
  ChainList[ChainList["Polygon"] = 'polygon'] = "Polygon";
  ChainList[ChainList["_0x89"] = '0x89'] = "_0x89";
  ChainList[ChainList["Mumbai"] = 'mumbai'] = "Mumbai";
  ChainList[ChainList["_0x13881"] = '0x13881'] = "_0x13881";
  ChainList[ChainList["Bsc"] = 'bsc'] = "Bsc";
  ChainList[ChainList["_0x38"] = '0x38'] = "_0x38";
  ChainList[ChainList["BscTestnet"] = 'bsc testnet'] = "BscTestnet";
  ChainList[ChainList["_0x61"] = '0x61'] = "_0x61";
})(ChainList || (ChainList = {}));
/**
 * AccountApi - fetch parameter creator
 * @export
 */


var AccountApiFetchParamCreator = function AccountApiFetchParamCreator(configuration) {
  return {
    /**
     * Gets NFT token transactions in descending order based on block number
     * @summary Gets NFT transfers of a ERC721 or ERC1155 token
     * @param {string} address address
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {string} [providerUrl] web3 provider url to user when using local dev chain
     * @param {number} [fromBlock] from_block
     * @param {number} [toBlock] to_block
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getHistoricalNFTTransfers: function getHistoricalNFTTransfers(address, chain, subdomain, providerUrl, fromBlock, toBlock, offset, limit, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getHistoricalNFTTransfers.');
      }

      var localVarPath = "/{address}/nft/transfers/verbose".replace("{" + 'address' + "}", encodeURIComponent(String(address)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (subdomain !== undefined) {
        localVarQueryParameter['subdomain'] = subdomain;
      }

      if (providerUrl !== undefined) {
        localVarQueryParameter['providerUrl'] = providerUrl;
      }

      if (fromBlock !== undefined) {
        localVarQueryParameter['from_block'] = fromBlock;
      }

      if (toBlock !== undefined) {
        localVarQueryParameter['to_block'] = toBlock;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },

    /**
     * Gets the transfers of the tokens matching the given parameters
     * @summary Gets NFT transfers to and from a given address
     * @param {string} address The sender or recepient of the transfer
     * @param {ChainList} [chain] The chain to query
     * @param {string} [format] The format of the token id
     * @param {string} [direction] The transfer direction
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;token_address\&quot;, \&quot;token_address.ASC\&quot;, \&quot;token_address.DESC\&quot;, Example 2: \&quot;token_address and token_id\&quot;, \&quot;token_address.ASC,token_id.DESC\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNFTTransfers: function getNFTTransfers(address, chain, format, direction, offset, limit, order, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getNFTTransfers.');
      }

      var localVarPath = "/{address}/nft/transfers".replace("{" + 'address' + "}", encodeURIComponent(String(address)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (format !== undefined) {
        localVarQueryParameter['format'] = format;
      }

      if (direction !== undefined) {
        localVarQueryParameter['direction'] = direction;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },

    /**
     * Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
     * @summary Gets the NFTs owned by a given address
     * @param {string} address The owner of a given token
     * @param {ChainList} [chain] The chain to query
     * @param {string} [format] The format of the token id
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNFTs: function getNFTs(address, chain, format, offset, limit, order, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getNFTs.');
      }

      var localVarPath = "/{address}/nft".replace("{" + 'address' + "}", encodeURIComponent(String(address)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (format !== undefined) {
        localVarQueryParameter['format'] = format;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },

    /**
     * Gets NFTs owned by the given address * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
     * @summary Gets the NFTs owned by a given address
     * @param {string} address The owner of a given token
     * @param {string} tokenAddress Address of the contract
     * @param {ChainList} [chain] The chain to query
     * @param {string} [format] The format of the token id
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNFTsForContract: function getNFTsForContract(address, tokenAddress, chain, format, offset, limit, order, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getNFTsForContract.');
      } // verify required parameter 'tokenAddress' is not null or undefined


      if (tokenAddress === null || tokenAddress === undefined) {
        throw new RequiredError('tokenAddress', 'Required parameter tokenAddress was null or undefined when calling getNFTsForContract.');
      }

      var localVarPath = "/{address}/nft/{token_address}".replace("{" + 'address' + "}", encodeURIComponent(String(address))).replace("{" + 'token_address' + "}", encodeURIComponent(String(tokenAddress)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (format !== undefined) {
        localVarQueryParameter['format'] = format;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },

    /**
     * Gets native balance for a specific address
     * @summary Gets native balance for a specific address.
     * @param {string} address The address for which the native balance will be checked
     * @param {ChainList} [chain] The chain to query
     * @param {string} [providerUrl] web3 provider url to user when using local dev chain
     * @param {number} [toBlock] The block number on which the balances should be checked
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNativeBalance: function getNativeBalance(address, chain, providerUrl, toBlock, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getNativeBalance.');
      }

      var localVarPath = "/{address}/balance".replace("{" + 'address' + "}", encodeURIComponent(String(address)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (providerUrl !== undefined) {
        localVarQueryParameter['providerUrl'] = providerUrl;
      }

      if (toBlock !== undefined) {
        localVarQueryParameter['to_block'] = toBlock;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },

    /**
     * Gets token balances for a specific address
     * @summary Gets token balances for a specific address.
     * @param {string} address The address for which token balances will be checked
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {number} [toBlock] The block number on which the balances should be checked
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTokenBalances: function getTokenBalances(address, chain, subdomain, toBlock, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getTokenBalances.');
      }

      var localVarPath = "/{address}/erc20".replace("{" + 'address' + "}", encodeURIComponent(String(address)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (subdomain !== undefined) {
        localVarQueryParameter['subdomain'] = subdomain;
      }

      if (toBlock !== undefined) {
        localVarQueryParameter['to_block'] = toBlock;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },

    /**
     * Gets ERC20 token transactions in descending order based on block number
     * @summary Gets erc 20 token transactions
     * @param {string} address address
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {number} [fromBlock] from_block
     * @param {number} [toBlock] to_block
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTokenTransfers: function getTokenTransfers(address, chain, subdomain, fromBlock, toBlock, offset, limit, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getTokenTransfers.');
      }

      var localVarPath = "/{address}/erc20/transfers".replace("{" + 'address' + "}", encodeURIComponent(String(address)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (subdomain !== undefined) {
        localVarQueryParameter['subdomain'] = subdomain;
      }

      if (fromBlock !== undefined) {
        localVarQueryParameter['from_block'] = fromBlock;
      }

      if (toBlock !== undefined) {
        localVarQueryParameter['to_block'] = toBlock;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },

    /**
     * Gets native transactions in descending order based on block number
     * @summary Gets native transactions
     * @param {string} address address
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {number} [fromBlock] from_block
     * @param {number} [toBlock] to_block
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTransactions: function getTransactions(address, chain, subdomain, fromBlock, toBlock, offset, limit, options) {
      if (options === void 0) {
        options = {};
      }

      // verify required parameter 'address' is not null or undefined
      if (address === null || address === undefined) {
        throw new RequiredError('address', 'Required parameter address was null or undefined when calling getTransactions.');
      }

      var localVarPath = "/{address}".replace("{" + 'address' + "}", encodeURIComponent(String(address)));
      var localVarUrlObj = url.parse(localVarPath, true);
      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {}; // authentication ApiKeyAuth required

      if (configuration && configuration.apiKey) {
        var localVarApiKeyValue = typeof configuration.apiKey === 'function' ? configuration.apiKey('X-API-Key') : configuration.apiKey;
        localVarHeaderParameter['X-API-Key'] = localVarApiKeyValue;
      }

      if (chain !== undefined) {
        localVarQueryParameter['chain'] = chain;
      }

      if (subdomain !== undefined) {
        localVarQueryParameter['subdomain'] = subdomain;
      }

      if (fromBlock !== undefined) {
        localVarQueryParameter['from_block'] = fromBlock;
      }

      if (toBlock !== undefined) {
        localVarQueryParameter['to_block'] = toBlock;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
/**
 * AccountApi - functional programming interface
 * @export
 */

var AccountApiFp = function AccountApiFp(configuration) {
  return {
    /**
     * Gets NFT token transactions in descending order based on block number
     * @summary Gets NFT transfers of a ERC721 or ERC1155 token
     * @param {string} address address
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {string} [providerUrl] web3 provider url to user when using local dev chain
     * @param {number} [fromBlock] from_block
     * @param {number} [toBlock] to_block
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getHistoricalNFTTransfers: function getHistoricalNFTTransfers(address, chain, subdomain, providerUrl, fromBlock, toBlock, offset, limit, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getHistoricalNFTTransfers(address, chain, subdomain, providerUrl, fromBlock, toBlock, offset, limit, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },

    /**
     * Gets the transfers of the tokens matching the given parameters
     * @summary Gets NFT transfers to and from a given address
     * @param {string} address The sender or recepient of the transfer
     * @param {ChainList} [chain] The chain to query
     * @param {string} [format] The format of the token id
     * @param {string} [direction] The transfer direction
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;token_address\&quot;, \&quot;token_address.ASC\&quot;, \&quot;token_address.DESC\&quot;, Example 2: \&quot;token_address and token_id\&quot;, \&quot;token_address.ASC,token_id.DESC\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNFTTransfers: function getNFTTransfers(address, chain, format, direction, offset, limit, order, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getNFTTransfers(address, chain, format, direction, offset, limit, order, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },

    /**
     * Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
     * @summary Gets the NFTs owned by a given address
     * @param {string} address The owner of a given token
     * @param {ChainList} [chain] The chain to query
     * @param {string} [format] The format of the token id
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNFTs: function getNFTs(address, chain, format, offset, limit, order, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getNFTs(address, chain, format, offset, limit, order, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },

    /**
     * Gets NFTs owned by the given address * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
     * @summary Gets the NFTs owned by a given address
     * @param {string} address The owner of a given token
     * @param {string} tokenAddress Address of the contract
     * @param {ChainList} [chain] The chain to query
     * @param {string} [format] The format of the token id
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNFTsForContract: function getNFTsForContract(address, tokenAddress, chain, format, offset, limit, order, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getNFTsForContract(address, tokenAddress, chain, format, offset, limit, order, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },

    /**
     * Gets native balance for a specific address
     * @summary Gets native balance for a specific address.
     * @param {string} address The address for which the native balance will be checked
     * @param {ChainList} [chain] The chain to query
     * @param {string} [providerUrl] web3 provider url to user when using local dev chain
     * @param {number} [toBlock] The block number on which the balances should be checked
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getNativeBalance: function getNativeBalance(address, chain, providerUrl, toBlock, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getNativeBalance(address, chain, providerUrl, toBlock, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },

    /**
     * Gets token balances for a specific address
     * @summary Gets token balances for a specific address.
     * @param {string} address The address for which token balances will be checked
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {number} [toBlock] The block number on which the balances should be checked
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTokenBalances: function getTokenBalances(address, chain, subdomain, toBlock, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getTokenBalances(address, chain, subdomain, toBlock, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },

    /**
     * Gets ERC20 token transactions in descending order based on block number
     * @summary Gets erc 20 token transactions
     * @param {string} address address
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {number} [fromBlock] from_block
     * @param {number} [toBlock] to_block
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTokenTransfers: function getTokenTransfers(address, chain, subdomain, fromBlock, toBlock, offset, limit, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getTokenTransfers(address, chain, subdomain, fromBlock, toBlock, offset, limit, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },

    /**
     * Gets native transactions in descending order based on block number
     * @summary Gets native transactions
     * @param {string} address address
     * @param {ChainList} [chain] The chain to query
     * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
     * @param {number} [fromBlock] from_block
     * @param {number} [toBlock] to_block
     * @param {number} [offset] offset
     * @param {number} [limit] limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTransactions: function getTransactions(address, chain, subdomain, fromBlock, toBlock, offset, limit, options) {
      var localVarFetchArgs = AccountApiFetchParamCreator(configuration).getTransactions(address, chain, subdomain, fromBlock, toBlock, offset, limit, options);
      return function (fetch, basePath) {
        if (fetch === void 0) {
          fetch = isomorphicFetch;
        }

        if (basePath === void 0) {
          basePath = BASE_PATH;
        }

        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    }
  };
};
/**
 * AccountApi - object-oriented interface
 * @export
 * @class AccountApi
 * @extends {BaseAPI}
 */

var AccountApi = /*#__PURE__*/function (_BaseAPI) {
  _inheritsLoose(AccountApi, _BaseAPI);

  function AccountApi() {
    return _BaseAPI.apply(this, arguments) || this;
  }

  var _proto = AccountApi.prototype;

  /**
   * Gets NFT token transactions in descending order based on block number
   * @summary Gets NFT transfers of a ERC721 or ERC1155 token
   * @param {string} address address
   * @param {ChainList} [chain] The chain to query
   * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
   * @param {string} [providerUrl] web3 provider url to user when using local dev chain
   * @param {number} [fromBlock] from_block
   * @param {number} [toBlock] to_block
   * @param {number} [offset] offset
   * @param {number} [limit] limit
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  _proto.getHistoricalNFTTransfers = function getHistoricalNFTTransfers(address, chain, subdomain, providerUrl, fromBlock, toBlock, offset, limit, options) {
    return AccountApiFp(this.configuration).getHistoricalNFTTransfers(address, chain, subdomain, providerUrl, fromBlock, toBlock, offset, limit, options)(this.fetch, this.basePath);
  }
  /**
   * Gets the transfers of the tokens matching the given parameters
   * @summary Gets NFT transfers to and from a given address
   * @param {string} address The sender or recepient of the transfer
   * @param {ChainList} [chain] The chain to query
   * @param {string} [format] The format of the token id
   * @param {string} [direction] The transfer direction
   * @param {number} [offset] offset
   * @param {number} [limit] limit
   * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;token_address\&quot;, \&quot;token_address.ASC\&quot;, \&quot;token_address.DESC\&quot;, Example 2: \&quot;token_address and token_id\&quot;, \&quot;token_address.ASC,token_id.DESC\&quot;
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  ;

  _proto.getNFTTransfers = function getNFTTransfers(address, chain, format, direction, offset, limit, order, options) {
    return AccountApiFp(this.configuration).getNFTTransfers(address, chain, format, direction, offset, limit, order, options)(this.fetch, this.basePath);
  }
  /**
   * Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
   * @summary Gets the NFTs owned by a given address
   * @param {string} address The owner of a given token
   * @param {ChainList} [chain] The chain to query
   * @param {string} [format] The format of the token id
   * @param {number} [offset] offset
   * @param {number} [limit] limit
   * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  ;

  _proto.getNFTs = function getNFTs(address, chain, format, offset, limit, order, options) {
    return AccountApiFp(this.configuration).getNFTs(address, chain, format, offset, limit, order, options)(this.fetch, this.basePath);
  }
  /**
   * Gets NFTs owned by the given address * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
   * @summary Gets the NFTs owned by a given address
   * @param {string} address The owner of a given token
   * @param {string} tokenAddress Address of the contract
   * @param {ChainList} [chain] The chain to query
   * @param {string} [format] The format of the token id
   * @param {number} [offset] offset
   * @param {number} [limit] limit
   * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  ;

  _proto.getNFTsForContract = function getNFTsForContract(address, tokenAddress, chain, format, offset, limit, order, options) {
    return AccountApiFp(this.configuration).getNFTsForContract(address, tokenAddress, chain, format, offset, limit, order, options)(this.fetch, this.basePath);
  }
  /**
   * Gets native balance for a specific address
   * @summary Gets native balance for a specific address.
   * @param {string} address The address for which the native balance will be checked
   * @param {ChainList} [chain] The chain to query
   * @param {string} [providerUrl] web3 provider url to user when using local dev chain
   * @param {number} [toBlock] The block number on which the balances should be checked
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  ;

  _proto.getNativeBalance = function getNativeBalance(address, chain, providerUrl, toBlock, options) {
    return AccountApiFp(this.configuration).getNativeBalance(address, chain, providerUrl, toBlock, options)(this.fetch, this.basePath);
  }
  /**
   * Gets token balances for a specific address
   * @summary Gets token balances for a specific address.
   * @param {string} address The address for which token balances will be checked
   * @param {ChainList} [chain] The chain to query
   * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
   * @param {number} [toBlock] The block number on which the balances should be checked
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  ;

  _proto.getTokenBalances = function getTokenBalances(address, chain, subdomain, toBlock, options) {
    return AccountApiFp(this.configuration).getTokenBalances(address, chain, subdomain, toBlock, options)(this.fetch, this.basePath);
  }
  /**
   * Gets ERC20 token transactions in descending order based on block number
   * @summary Gets erc 20 token transactions
   * @param {string} address address
   * @param {ChainList} [chain] The chain to query
   * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
   * @param {number} [fromBlock] from_block
   * @param {number} [toBlock] to_block
   * @param {number} [offset] offset
   * @param {number} [limit] limit
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  ;

  _proto.getTokenTransfers = function getTokenTransfers(address, chain, subdomain, fromBlock, toBlock, offset, limit, options) {
    return AccountApiFp(this.configuration).getTokenTransfers(address, chain, subdomain, fromBlock, toBlock, offset, limit, options)(this.fetch, this.basePath);
  }
  /**
   * Gets native transactions in descending order based on block number
   * @summary Gets native transactions
   * @param {string} address address
   * @param {ChainList} [chain] The chain to query
   * @param {string} [subdomain] The subdomain of the moralis server to use (Only use when selecting local devchain as chain)
   * @param {number} [fromBlock] from_block
   * @param {number} [toBlock] to_block
   * @param {number} [offset] offset
   * @param {number} [limit] limit
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  ;

  _proto.getTransactions = function getTransactions(address, chain, subdomain, fromBlock, toBlock, offset, limit, options) {
    return AccountApiFp(this.configuration).getTransactions(address, chain, subdomain, fromBlock, toBlock, offset, limit, options)(this.fetch, this.basePath);
  };

  return AccountApi;
}(BaseAPI);

var config = {
  apiKey: MORALIS_API_KEY,
  accessToken: MORALIS_APPLICATION_ID
};
var instance = /*#__PURE__*/new AccountApi(config);

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
/**
  * Gets NFTs owned by the given address * The response will include status [SYNCED/SYNCING] based on the contracts being indexed. * Use the token_address param to get results for a specific contract only * Note results will include all indexed NFTs * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested
  * @summary Gets the NFTs owned by a given address
  * @param {string} address The owner of a given token
  * @param {ChainList} [chain] The chain to query
  * @param {string} [format] The format of the token id
  * @param {string} [order] The field(s) to order on and if it should be ordered in ascending or descending order. Specified by: fieldName1.order,fieldName2.order. Example 1: \&quot;name\&quot;, \&quot;name.ASC\&quot;, \&quot;name.DESC\&quot;, Example 2: \&quot;Name and Symbol\&quot;, \&quot;name.ASC,symbol.DESC\&quot;
  * @param {*} [options] Override http request option.
  * @throws {RequiredError}
  * @memberof AccountApi
*/


var getAllNFTs = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(address, chain, format, order) {
    var page, pageSize, NFTs, delay, response;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = 0;
            pageSize = 100;
            NFTs = [];
            delay = 3;
            _context.prev = 4;

          case 5:

            _context.next = 8;
            return instance.getNFTs(address, chain, format, page * pageSize, page * pageSize + pageSize);

          case 8:
            response = _context.sent;

            if (!(response.status == 'SYNCING' && delay !== 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return sleep(2000);

          case 12:
            delay--;
            return _context.abrupt("continue", 5);

          case 14:
            if (!(delay === 0)) {
              _context.next = 17;
              break;
            }

            console.error("Moralis NFT SDK Syncing Failed");
            throw new Error("error moralis sdk getNfts sync failed");

          case 17:
            NFTs = [].concat(NFTs, response.result);
            page++;

            if (!(page * pageSize > response.total)) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("break", 23);

          case 21:
            _context.next = 5;
            break;

          case 23:
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](4);
            console.error("error occured while fetching user NFTs");
            throw _context.t0;

          case 29:
            return _context.abrupt("return", NFTs);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 25]]);
  }));

  return function getAllNFTs(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var runProcess = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("woww");
            _context2.next = 3;
            return getAllNFTs("0x9B6134Fe036F1C22D9Fe76c15AC81B7bC31212eB", ChainList.Rinkeby);

          case 3:

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function runProcess() {
    return _ref2.apply(this, arguments);
  };
}();

var runApp = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return runProcess();

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function runApp() {
    return _ref3.apply(this, arguments);
  };
}();

runApp();
//# sourceMappingURL=nft-scraper.cjs.development.js.map