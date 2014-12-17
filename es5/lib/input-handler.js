"use strict";
Object.defineProperties(exports, {
  InputHandlerMiddleware: {get: function() {
      return InputHandlerMiddleware;
    }},
  inputHandlerMiddleware: {get: function() {
      return inputHandlerMiddleware;
    }},
  __esModule: {value: true}
});
var $__quiver_45_object__,
    $__simple_45_middleware__,
    $__component__,
    $__extensible_45_component__;
var assertString = ($__quiver_45_object__ = require("quiver-object"), $__quiver_45_object__ && $__quiver_45_object__.__esModule && $__quiver_45_object__ || {default: $__quiver_45_object__}).assertString;
var ConfigMiddleware = ($__simple_45_middleware__ = require("./simple-middleware"), $__simple_45_middleware__ && $__simple_45_middleware__.__esModule && $__simple_45_middleware__ || {default: $__simple_45_middleware__}).ConfigMiddleware;
var HandlerComponent = ($__component__ = require("./component"), $__component__ && $__component__.__esModule && $__component__ || {default: $__component__}).HandlerComponent;
var $__3 = ($__extensible_45_component__ = require("./extensible-component"), $__extensible_45_component__ && $__extensible_45_component__.__esModule && $__extensible_45_component__ || {default: $__extensible_45_component__}),
    ExtensibleHandler = $__3.ExtensibleHandler,
    ExtensibleMiddleware = $__3.ExtensibleMiddleware;
var loadHandler = (function(config, component, options) {
  return component.loadHandler(config, options);
});
var InputHandlerMiddleware = function InputHandlerMiddleware(handlerComponent, toConfig) {
  var $__6;
  var options = arguments[2] !== (void 0) ? arguments[2] : {};
  if (!handlerComponent.isHandlerComponent) {
    throw new TypeError('input handler must be of type HandlerComponent');
  }
  assertString(toConfig, 'toConfig required to be string');
  var $__5 = options,
      loader = ($__6 = $__5.loader) === void 0 ? loadHandler : $__6;
  this._handlerLoader = loader;
  this._toInputConfig = toConfig;
  options.safeWrapped = true;
  $traceurRuntime.superConstructor($InputHandlerMiddleware).call(this, null, options);
  this.subComponents.inputHandler = handlerComponent;
};
var $InputHandlerMiddleware = InputHandlerMiddleware;
($traceurRuntime.createClass)(InputHandlerMiddleware, {
  toConfigHandler: function() {
    var handlerComponent = this.inputHandlerComponent;
    var loader = this._handlerLoader;
    var toConfig = this._toInputConfig;
    return (function(config) {
      return loader(config, handlerComponent).then((function(handler) {
        config[toConfig] = handler;
        return config;
      }));
    });
  },
  get inputHandlerComponent() {
    return this.subComponents.inputHandler;
  },
  traverse: function(callback) {
    callback(this.inputHandlerComponent);
    $traceurRuntime.superGet(this, $InputHandlerMiddleware.prototype, "traverse").call(this, callback);
  },
  get type() {
    return 'input handler middleware';
  },
  toJson: function() {
    var json = $traceurRuntime.superGet(this, $InputHandlerMiddleware.prototype, "toJson").call(this);
    json.inputHandler = this.inputHandlerComponent.toJson();
    return json;
  }
}, {}, ConfigMiddleware);
var mixinInputHandler = (function(prototype) {
  prototype.inputHandler = function(handler, toConfig, options) {
    return this.addMiddleware(new InputHandlerMiddleware(handler, toConfig, options));
  };
});
mixinInputHandler(ExtensibleHandler.prototype);
mixinInputHandler(ExtensibleMiddleware.prototype);
var inputHandlerMiddleware = (function(handler, toConfig, options) {
  return new InputHandlerMiddleware(handler, toConfig, options);
});
