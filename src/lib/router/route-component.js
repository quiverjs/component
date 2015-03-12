import { async } from 'quiver-promise'
import { loadHandleable } from '../util/loader'

import { 
  combineBuilderWithMiddleware
} from '../util/middleware'

import { 
  Component, HandlerComponent 
} from '../component'

import { MethodRouter } from './method-router'

import {
  regexMatcher, paramMatcher, paramUrlBuilder
} from './dynamic-route'

let combineUrlBuilders = (urlBuilder1, urlBuilder2) => {
  if(!urlBuilder1 || !urlBuilder2) return null

  return (args, restPath='/') => {
    let newRestPath = urlBuilder2(args, restPath)

    return urlBuilder1(args, newRestPath)
  }
}

let urlMiddleware = urlBuilder =>
  async(function*(config, builder) {
    let newUrlBuilder = config.urlBuilder = combineUrlBuilders(
      config.urlBuilder, urlBuilder)

    let handleable = yield builder(config)
    
    if(!handleable.urlBuilder) {
      handleable.urlBuilder = newUrlBuilder
    }

    return handleable
  })

let routeBuilder = (component, urlBuilder, middleware) => {
  let mainBuilder = component.toHandleableBuilder()
  let middlewares = []

  if(urlBuilder) {
    middlewares.push(urlMiddleware(urlBuilder))
  }

  middlewares.push(middleware)

  return combineBuilderWithMiddlewares(
    mainBuilder, middlewares)
}

export class Route extends Component {
  constructor(handlerComponent, options={}) {
    if(!handlerComponent.isHandlerComponent) {
      // argument is method map
      handlerComponent = new MethodRouter(handlerComponent)
    }

    let { urlBuilder } = options
    super(options)

    this._urlBuilder = urlBuilder
    this.subComponents.routeHandler = handlerComponent
  }

  toHandleableBuilder() {
    let mainBuilder = this.handlerComponent.toHandleableBuilder()
    let urlBuilder = this.urlBuilder

    if(urlBuilder) {
      return combineBuilderWithMiddleware(mainBuilder,
        urlMiddleware(urlBuilder))
    } else {
      return mainBuilder
    }
  }

  get routeSpec() {
    throw new Error('unimplemented')
  }

  get handlerComponent() {
    return this.subComponents.routeHandler
  }

  get urlBuilder() {
    return this._urlBuilder
  }

  get type() {
    return 'route'
  }

  get isRoute() {
    return true
  }

  toJson() {
    let json = super.toJson()
    json.handler = this.handlerComponent.toJson()
    return json
  }
}

export class StaticRoute extends Route {
  constructor(handlerComponent, staticPath, options={}) {
    if(typeof(staticPath) != 'string')
      throw new TypeError('staticPath must be provided as string')

    let urlBuilder = () => staticPath
    options.urlBuilder = options.urlBuilder || urlBuilder

    super(handlerComponent, options)

    this._staticPath = staticPath
  }

  get routeSpec() {
    return {
      routeType: 'static',
      path: this.staticPath
    }
  }

  get staticPath() {
    return this._staticPath
  }

  get type() {
    return 'static route'
  }

  get routeType() {
    return 'static'
  }

  toJson() {
    let json = super.toJson()
    json.staticPath = this.staticPath
    return json
  }
}

export class DynamicRoute extends Route {
  constructor(handlerComponent, matcher, options={}) {
    if(typeof(matcher) != 'function')
      throw new TypeError('matcher must be of type function')

    super(handlerComponent, options)

    this._matcher = matcher
  }

  get routeSpec() {
    return {
      routeType: 'dynamic',
      matcher: this.matcher
    }
  }

  get matcher() {
    return this._matcher
  }

  get type() {
    return 'dynamic route'
  }

  get routeType() {
    return 'dynamic'
  }
}

export class RegexRoute extends DynamicRoute {
  constructor(handlerComponent, regex, matchFields=[], options={}) {
    if(!(regex instanceof RegExp))
      throw new TypeError('regex must be regular expression')

    let matcher = regexMatcher(regex, matchFields)

    super(handlerComponent, matcher, options)

    this._regex = regex
  }

  get regex() {
    return this._regex
  }

  get type() {
    return 'regex route'
  }
}

export class ParamRoute extends DynamicRoute {
  constructor(handlerComponent, paramPath, options={}) {
    if(typeof(paramPath) != 'string')
      throw new TypeError('param path must be of type string')

    let matcher = paramMatcher(paramPath)

    options.urlBuilder = options.urlBuilder || paramUrlBuilder(paramPath)

    super(handlerComponent, matcher, options)
    
    this._paramPath = paramPath
  }

  get paramPath() {
    return this._paramPath
  }

  get type() {
    return 'param route'
  }
  
  toJson() {
    let json = super.toJson()
    json.paramPath = this.paramPath
    return json
  }
}

export let staticRoute = (handler, path, options) =>
  new StaticRoute(handler, path, options)

export let dynamicRoute = (handler, matcher, options) =>
  new DynamicRoute(handler, matcher, options)

export let regexRoute = (handler, regex, fields, options) =>
  new RegexRoute(handler, regex, fields, options)

export let paramRoute = (handler, path, options) =>
  new ParamRoute(handler, path, options)