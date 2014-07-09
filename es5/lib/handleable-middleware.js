"use strict";
Object.defineProperties(exports, {
  HandleableMiddleware: {get: function() {
      return HandleableMiddleware;
    }},
  __esModule: {value: true}
});
var assertInstanceOf = $traceurRuntime.assertObject(require('quiver-object')).assertInstanceOf;
var safeHandler = $traceurRuntime.assertObject(require('./util/wrap.js')).safeHandler;
var ExtensibleMiddleware = $traceurRuntime.assertObject(require('./extensible-component.js')).ExtensibleMiddleware;
var combineMiddlewares = $traceurRuntime.assertObject(require('./util/middleware.js')).combineMiddlewares;
var mixinMiddlewareExtensible = $traceurRuntime.assertObject(require('./extend-middleware.js')).mixinMiddlewareExtensible;
var HandleableMiddleware = function HandleableMiddleware(handleableMiddleware) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._mainHandleableMiddleware = safeHandler(handleableMiddleware, options);
  this._initMiddlewareExtension(options);
  $traceurRuntime.superCall(this, $HandleableMiddleware.prototype, "constructor", [options]);
};
var $HandleableMiddleware = HandleableMiddleware;
($traceurRuntime.createClass)(HandleableMiddleware, {
  get mainHandleableMiddleware() {
    return this._mainHandleableMiddleware;
  },
  get type() {
    return 'handleable middleware';
  },
  toJson: function() {
    var json = $traceurRuntime.superCall(this, $HandleableMiddleware.prototype, "toJson", []);
    json.middlewares = this.middlewareJson();
    return json;
  }
}, {}, ExtensibleMiddleware);
