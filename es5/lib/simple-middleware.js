"use strict";
Object.defineProperties(exports, {
  ConfigMiddleware: {get: function() {
      return ConfigMiddleware;
    }},
  ConfigOverrideMiddleware: {get: function() {
      return ConfigOverrideMiddleware;
    }},
  ConfigAliasMiddleware: {get: function() {
      return ConfigAliasMiddleware;
    }},
  configMiddleware: {get: function() {
      return configMiddleware;
    }},
  configOverrideMiddleware: {get: function() {
      return configOverrideMiddleware;
    }},
  configAliasMiddleware: {get: function() {
      return configAliasMiddleware;
    }},
  __esModule: {value: true}
});
var $__quiver_45_object__,
    $__quiver_45_promise__,
    $__util_47_wrap__,
    $__handleable_45_middleware__,
    $__extensible_45_component__;
var copy = ($__quiver_45_object__ = require("quiver-object"), $__quiver_45_object__ && $__quiver_45_object__.__esModule && $__quiver_45_object__ || {default: $__quiver_45_object__}).copy;
var resolve = ($__quiver_45_promise__ = require("quiver-promise"), $__quiver_45_promise__ && $__quiver_45_promise__.__esModule && $__quiver_45_promise__ || {default: $__quiver_45_promise__}).resolve;
var safeHandler = ($__util_47_wrap__ = require("./util/wrap"), $__util_47_wrap__ && $__util_47_wrap__.__esModule && $__util_47_wrap__ || {default: $__util_47_wrap__}).safeHandler;
var HandleableMiddleware = ($__handleable_45_middleware__ = require("./handleable-middleware"), $__handleable_45_middleware__ && $__handleable_45_middleware__.__esModule && $__handleable_45_middleware__ || {default: $__handleable_45_middleware__}).HandleableMiddleware;
var $__4 = ($__extensible_45_component__ = require("./extensible-component"), $__extensible_45_component__ && $__extensible_45_component__.__esModule && $__extensible_45_component__ || {default: $__extensible_45_component__}),
    ExtensibleHandler = $__4.ExtensibleHandler,
    ExtensibleMiddleware = $__4.ExtensibleMiddleware;
var configHandlerToMiddleware = (function(configHandler) {
  return (function(config, builder) {
    return configHandler(config).then((function() {
      var newConfig = arguments[0] !== (void 0) ? arguments[0] : config;
      return builder(newConfig);
    }));
  });
});
var ConfigMiddleware = function ConfigMiddleware(configHandler) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._configHandler = safeHandler(configHandler, options);
  $traceurRuntime.superCall(this, $ConfigMiddleware.prototype, "constructor", [null, options]);
};
var $ConfigMiddleware = ConfigMiddleware;
($traceurRuntime.createClass)(ConfigMiddleware, {
  get mainMiddleware() {
    var configHandler = this.configHandler;
    return (function(config, builder) {
      return configHandler(config).then(builder);
    });
  },
  get configHandler() {
    if (!this._configHandler)
      throw new Error('configHandler is not defined');
    return this._configHandler;
  },
  get type() {
    return 'config middleware';
  }
}, {}, HandleableMiddleware);
var ConfigOverrideMiddleware = function ConfigOverrideMiddleware(overrideConfig) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._overrideConfig = overrideConfig;
  options.safeWrapped = true;
  $traceurRuntime.superCall(this, $ConfigOverrideMiddleware.prototype, "constructor", [null, options]);
};
var $ConfigOverrideMiddleware = ConfigOverrideMiddleware;
($traceurRuntime.createClass)(ConfigOverrideMiddleware, {
  get configHandler() {
    var overrideConfig = this.overrideConfig;
    return (function(config) {
      for (var key in overrideConfig) {
        config[key] = overrideConfig[key];
      }
      return resolve(config);
    });
  },
  get overrideConfig() {
    return this._overrideConfig;
  },
  get type() {
    return 'config override middleware';
  },
  toJson: function() {
    var json = $traceurRuntime.superCall(this, $ConfigOverrideMiddleware.prototype, "toJson", []);
    json.overrideConfig = this.overrideConfig;
    return json;
  }
}, {}, ConfigMiddleware);
var ConfigAliasMiddleware = function ConfigAliasMiddleware(aliasConfig) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._aliasConfig = aliasConfig;
  options.safeWrapped = true;
  $traceurRuntime.superCall(this, $ConfigAliasMiddleware.prototype, "constructor", [null, options]);
};
var $ConfigAliasMiddleware = ConfigAliasMiddleware;
($traceurRuntime.createClass)(ConfigAliasMiddleware, {
  get configHandler() {
    var aliasConfig = this._aliasConfig;
    return (function(config) {
      for (var key in aliasConfig) {
        var aliasKey = aliasConfig[key];
        config[key] = config[aliasKey];
      }
      return resolve(config);
    });
  },
  get aliasConfig() {
    return copy(this._aliasConfig);
  },
  get type() {
    return 'config alias middleware';
  },
  toJson: function() {
    var json = $traceurRuntime.superCall(this, $ConfigAliasMiddleware.prototype, "toJson", []);
    json.aliasConfig = this.aliasConfig;
    return json;
  }
}, {}, ConfigMiddleware);
var mixinConfigOverride = (function(prototype) {
  prototype.configOverride = function(config) {
    return this.addMiddleware(new ConfigOverrideMiddleware(config));
  };
});
var mixinConfigAlias = (function(prototype) {
  prototype.configAlias = function(config) {
    return this.addMiddleware(new ConfigAliasMiddleware(config));
  };
});
mixinConfigOverride(ExtensibleHandler.prototype);
mixinConfigOverride(ExtensibleMiddleware.prototype);
mixinConfigAlias(ExtensibleHandler.prototype);
mixinConfigAlias(ExtensibleMiddleware.prototype);
var configMiddleware = (function(handler) {
  return new ConfigMiddleware(handler);
});
var configOverrideMiddleware = (function(config) {
  return new ConfigOverrideMiddleware(config);
});
var configAliasMiddleware = (function(config) {
  return new ConfigAliasMiddleware(config);
});
