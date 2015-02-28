import { loadHandleable } from './util/loader'
import { HandleableBuilder } from './handleable-builder'
import { HandleableMiddleware } from './handleable-middleware'

export class ExtendHandler extends HandleableBuilder {
  constructor(handlerComponent, options={}) {
    if(!handlerComponent.isHandlerComponent) {
      throw new Error('Extended component must be handler component')
    }

    options.safeWrapped = true
    super(null, options)

    this.addSubComponent('extendHandler', handlerComponent)
  }

  toMainHandleableBuilder() {
    let extendHandler = this.getSubComponent('extendHandler')
    let id = extendHandler.id
    let builder = extendHandler.toHandleableBuilder()

    return config =>
      loadHandleable(config, id, builder)
  }
}

export class ExtendMiddleware extends HandleableMiddleware {
  constructor(middlewareComponent, options={}) {
    if(!middlewareComponent.isMiddlewareComponent) {
      throw new Error('Extended component must be middleware component')
    }

    options.safeWrapped = true
    super(null, options)

    this.addSubComponent('extendMiddleware', middlewareComponent)
  }

  toMainHandleableBuilder() {
    return this.getSubComponent('extendMiddleware')
      .toHandleableMiddleware()
  }
}

export let extendHandler = handlerComponent =>
  new ExtendHandler(handlerComponent)

export let extendMiddleware = middlewareComponent =>
  new ExtendMiddleware(middlewareComponent)