import { copy } from 'quiver-object'
import { Component } from './component'
import { listComponent } from './composite/list'

import { 
  combineMiddlewares, 
  combineMiddlewareComponents,
  combineBuilderWithMiddleware
} from './util/middleware'

import { loadHandleable } from './util/loader'

let _middlewareComponents = Symbol('_middlewareComponents')

let copyConfigBuilder = builder =>
  config =>
    builder(copy(config))

export class ExtensibleComponent extends Component {
  constructor(options={}) {
    super(options)

    this[_middlewareComponents] = []
    this.subComponents.middlewareList = 
      listComponent()
  }

  addMiddleware(middleware) {
    if(!middleware.isMiddlewareComponent) {
      throw new TypeError(
        'middleware must be of type MiddlewareComponent')
    }

    this.middlewareList.push(middleware)

    return this
  }

  prependMiddleware(middleware) {
    if(!middleware.isMiddlewareComponent) {
      throw new TypeError(
        'middleware must be of type MiddlewareComponent')
    }

    this.middlewareList.unshift(middleware)

    return this
  }

  middleware(middleware) {
    return this.addMiddleware(middleware)
  }

  toExtendMiddleware() {
    return combineMiddlewareComponents(
        this.middlewareComponents)
  }

  get middlewareList() {
    return this.subComponents.middlewareList
  }

  get middlewareComponents() {
    return this.middlewareList.array
  }
}

export class ExtensibleHandler extends ExtensibleComponent {
  constructor(options={}) {
    super(options)

    let { copyConfig=true } = options
    this._copyConfig = copyConfig
  }

  toHandleableBuilder() {
    let copyConfig = this._copyConfig

    let mainBuilder = this.toMainHandleableBuilder()
    let extendMiddleware = this.toExtendMiddleware()

    let builder = combineBuilderWithMiddleware(
      mainBuilder, extendMiddleware)

    if(copyConfig)
      builder = copyConfigBuilder(builder)

    return builder
  }

  toMainHandleableBuilder() {
    throw new Error('unimplemented')
  }

  loadHandleable(config, options) {
    return loadHandleable(config, this.id, 
      this.toHandleableBuilder(), options)
  }

  loadHandler(config, options) {
    let loader = this.handlerLoader
    return loader(config, this.id, 
      this.toHandleableBuilder(), options)
  }

  setLoader(handlerLoader) {
    this._handlerLoader = handlerLoader
    return this
  }

  get handlerLoader() {
    if(this._handlerLoader) return this._handlerLoader

    return this.defaultLoader
  }

  get defaultLoader() {
    return loadHandleable
  }

  get type() {
    return 'handler'
  }

  get isHandlerComponent() {
    return true
  }
}

export class ExtensibleMiddleware extends ExtensibleComponent {
  toHandleableMiddleware() {
    let mainMiddleware = this.toMainHandleableMiddleware()
    let extendMiddleware = this.toExtendMiddleware()

    return combineMiddlewares([mainMiddleware, extendMiddleware])
  }

  toMainHandleableMiddleware() {
    throw new Error('unimplemented')
  }

  get isMiddlewareComponent() {
    return true
  }
}
