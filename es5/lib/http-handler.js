"use strict";
Object.defineProperties(exports, {
  HttpHandlerBuilder: {get: function() {
      return HttpHandlerBuilder;
    }},
  HttpHandler: {get: function() {
      return HttpHandler;
    }},
  __esModule: {value: true}
});
var resolve = $traceurRuntime.assertObject(require('quiver-promise')).resolve;
var loadHttpHandler = $traceurRuntime.assertObject(require('./util/loader.js')).loadHttpHandler;
var $__1 = $traceurRuntime.assertObject(require('./util/wrap.js')),
    safeBuilder = $__1.safeBuilder,
    safeHandler = $__1.safeHandler;
var HandleableBuilder = $traceurRuntime.assertObject(require('./handleable-builder.js')).HandleableBuilder;
var httpToHandleableBuilder = (function(httpBuilder) {
  return (function(config) {
    return resolve(httpBuilder(config)).then((function(httpHandler) {
      return ({get httpHandler() {
          return httpHandler;
        }});
    }));
  });
});
var HttpHandlerBuilder = function HttpHandlerBuilder(httpHandlerBuilder) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._httpHandlerBuilder = httpHandlerBuilder;
  httpHandlerBuilder = safeBuilder(httpHandlerBuilder, options);
  var handleableBuilder = httpToHandleableBuilder(httpHandlerBuilder);
  $traceurRuntime.superCall(this, $HttpHandlerBuilder.prototype, "constructor", [handleableBuilder, options]);
};
var $HttpHandlerBuilder = HttpHandlerBuilder;
($traceurRuntime.createClass)(HttpHandlerBuilder, {
  get httpHandlerBuilder() {
    return this._httpHandlerBuilder;
  },
  loadHttpHandler: function(config, options) {
    return loadHttpHandler(config, this, this.handleableBuilder, options);
  },
  loadHandler: function(config, options) {
    return this.loadHttpHandler(config, options);
  }
}, {}, HandleableBuilder);
var HttpHandler = function HttpHandler(httpHandler) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._httpHandler = httpHandler;
  httpHandler = safeHandler(httpHandler, options);
  var httpHandlerBuilder = (function(config) {
    return resolve(httpHandler);
  });
  $traceurRuntime.superCall(this, $HttpHandler.prototype, "constructor", [httpHandlerBuilder, options]);
};
var $HttpHandler = HttpHandler;
($traceurRuntime.createClass)(HttpHandler, {get httpHandler() {
    return this._httpHandler;
  }}, {}, HttpHandlerBuilder);