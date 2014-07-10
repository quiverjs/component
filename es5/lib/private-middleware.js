"use strict";
Object.defineProperties(exports, {
  PrivateMiddleware: {get: function() {
      return PrivateMiddleware;
    }},
  privateMiddleware: {get: function() {
      return privateMiddleware;
    }},
  __esModule: {value: true}
});
var assertInstanceOf = $traceurRuntime.assertObject(require('quiver-object')).assertInstanceOf;
var getInitTable = $traceurRuntime.assertObject(require('./util/config.js')).getInitTable;
var MiddlewareComponent = $traceurRuntime.assertObject(require('./component.js')).MiddlewareComponent;
var combineMiddlewares = $traceurRuntime.assertObject(require('./util/middleware.js')).combineMiddlewares;
var mixinMiddlewareExtensible = $traceurRuntime.assertObject(require('./mixin-middleware.js')).mixinMiddlewareExtensible;
var PrivateMiddleware = function PrivateMiddleware(middlewareComponent) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  assertInstanceOf(middlewareComponent, MiddlewareComponent, 'Only MiddlewareComponent can be privatized');
  this.initMiddlewareExtension(options);
  this._middlewareComponent = middlewareComponent;
  this._initKey = Symbol();
};
var $PrivateMiddleware = PrivateMiddleware;
($traceurRuntime.createClass)(PrivateMiddleware, {
  get handleableMiddleware() {
    var mainMiddleware = this._middlewareComponent.handleableMiddleware;
    var extendMiddleware = this.extendMiddleware;
    var middleware = combineMiddlewares([mainMiddleware, extendMiddleware]);
    var initKey = this._initKey;
    return (function(config, builder) {
      var initTable = getInitTable(config);
      if (initTable[initKey])
        return builder(config);
      initTable[initKey] = true;
      return middleware(config, builder);
    });
  },
  get type() {
    return 'private middleware';
  },
  toJson: function() {
    var json = $traceurRuntime.superCall(this, $PrivateMiddleware.prototype, "toJson", []);
    json.middleware = this._middlewareComponent.toJson();
    return json;
  }
}, {}, MiddlewareComponent);
mixinMiddlewareExtensible(PrivateMiddleware.prototype);
var privateMiddleware = (function(middleware, options) {
  return new PrivateMiddleware(middleware, options);
});
