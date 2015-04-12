import { loadHandleable } from './util/loader'
import { HandleableBuilder } from './handleable-builder'
import { HandleableMiddleware } from './handleable-middleware'

export class ExtendHandler extends HandleableBuilder {
  constructor(handlerComponent, options={}) {
    if(!handlerComponent.isHandlerComponent) {
      throw new Error('Extended component must be handler component')
    }
    
    super(null, options)

    this.addSubComponent('extendHandler', handlerComponent)
  }

  toMainHandleableBuilder() {
    const extendHandler = this.getSubComponent('extendHandler')
    const id = extendHandler.id
    const builder = extendHandler.toHandleableBuilder()

    return config =>
      loadHandleable(config, id, builder)
  }

  get componentType() {
    return 'ExtendHandler'
  }
}

export class ExtendMiddleware extends HandleableMiddleware {
  constructor(middlewareComponent, options={}) {
    if(!middlewareComponent.isMiddlewareComponent) {
      throw new Error('Extended component must be middleware component')
    }

    super(null, options)

    this.addSubComponent('extendMiddleware', middlewareComponent)
  }

  toMainHandleableBuilder() {
    return this.getSubComponent('extendMiddleware')
      .toHandleableMiddleware()
  }

  get componentType() {
    return 'ExtendMiddleware'
  }
}

export const extendHandler = handlerComponent =>
  new ExtendHandler(handlerComponent)

export const extendMiddleware = middlewareComponent =>
  new ExtendMiddleware(middlewareComponent)