import { safePromised, createPromise } from 'quiver-promise'

var assertFunction = fn => {
  if(typeof(fn) != 'function') {
    throw new Error('argument must be of type function')
  }
}

export var safeHandler = (handler, options={}) => {
  var { safeWrapped=false } = options

  if(safeWrapped) return handler

  assertFunction(handler)
  options.safeWrapped = true

  return safePromised(handler)
}

export var safeBuilder = (builder, options={}) => {
  var { safeWrapped=false } = options

  if(safeWrapped) return builder

  assertFunction(builder)
  options.safeWrapped = true

  var safeBuilder = safePromised(builder)

  return (...args) =>
    safeBuilder(...args).then(safeHandler)
}