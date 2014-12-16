import { resolve } from 'quiver-promise'

import { safeHandler } from './util/wrap'
import { ExtensibleHandler } from './extensible-component'

export class HandleableBuilder extends ExtensibleHandler {
  constructor(handleableBuilder, options={}) {
    this._mainHandleableBuilder = safeHandler(
      handleableBuilder, options)

    super(options)
  }

  toMainHandleableBuilder() {
    return this._mainHandleableBuilder
  }

  get type() {
    return 'handleable builder'
  }
}

export class Handleable extends HandleableBuilder {
  constructor(handleable, options={}) {
    this._handleable = handleable
    options.safeWrapped = true

    super(null, options)
  }

  toMainHandleableBuilder() {
    var handleable = this.toHandleable()

    return config => resolve(handleable)
  }

  toHandleable() {
    if(!this._handleable) throw new Error(
      'handleable is not defined')

    return this._handleable
  }

  get type() {
    return 'handleable'
  }
}

export var handleableBuilder = (builder, options) =>
  new HandleableBuilder(builder, options)

export var handleable = (handleable, options) =>
  new Handleable(handleable, options)