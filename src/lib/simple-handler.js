import { resolve } from 'quiver-promise'

import { 
  simpleToStreamHandler, 
  streamToSimpleHandler,
  validateSimpleTypes 
} from 'quiver-simple-handler'

import { simpleHandlerLoader } from './util/loader'
import { safeBuilder, safeHandler } from './util/wrap'
import { StreamHandler, StreamHandlerBuilder } from './stream-handler'

export class SimpleHandlerBuilder extends StreamHandlerBuilder {
  constructor(simpleHandlerBuilder, inType, outType, options={}) {
    let err = validateSimpleTypes([inType, outType])
    if(err) throw err

    this._inType = inType
    this._outType = outType

    this._simpleHandlerBuilder = safeBuilder(
      simpleHandlerBuilder, options)

    super(null, options)
  }

  toStreamHandlerBuilder() {
    let { inType, outType } = this

    let simpleHandlerBuilder = this.toSimpleHandlerBuilder()

    return config =>
      simpleHandlerBuilder(config)
      .then(simpleHandler =>
        simpleToStreamHandler(simpleHandler, inType, outType))
  }

  toSimpleHandlerBuilder() {
    if(!this._simpleHandlerBuilder) throw new Error(
      'simpleHandlerBuilder is not define')

    return this._simpleHandlerBuilder
  }

  get defaultLoader() {
    return simpleHandlerLoader(this.inType, this.outType)
  }

  get inType() {
    return this._inType
  }

  get outType() {
    return this._outType
  }

  get type() {
    return 'simple handler builder'
  }

  toJson() {
    let json = super.toJson()

    json.inType = this.inType
    json.outType = this.outType

    return json
  }
}

export class SimpleHandler extends SimpleHandlerBuilder {
  constructor(simpleHandler, inType, outType, options={}) {
    this._simpleHandler = safeHandler(simpleHandler, options)

    super(null, inType, outType, options)
  }

  toSimpleHandlerBuilder() {
    let simpleHandler = this.toSimpleHandler()

    return config =>
      resolve(simpleHandler)
  }

  toSimpleHandler() {
    if(!this._simpleHandler) throw new Error(
      'simpleHandler is not defined')

    return this._simpleHandler
  }

  get type() {
    return 'simple handler'
  }
}

export let simpleHandlerBuilder = (builder, inType, outType, options) =>
  new SimpleHandlerBuilder(builder, inType, outType, options)

export let simpleHandler = (handler, inType, outType, options) =>
  new SimpleHandler(handler, inType, outType, options)