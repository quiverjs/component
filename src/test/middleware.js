import { resolve, reject } from 'quiver-promise'

import {
  simpleHandler, simpleHandlerBuilder, 
  inputHandler, configOverride, configAlias
} from '../lib/export.js'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const should = chai.should()

describe('middleware test', () => {
  it('input handler', async function() {
    const uppercase = simpleHandler(
      (args, input) =>  input.toUpperCase() + '!', 
      'text', 'text')

    const main = simpleHandlerBuilder(
      config => {
        const inHandler = config.inHandler
        should.exist(inHandler)

        return async function(args, input) {
          const result = await inHandler(args, input)
          
          return {
            status: 'ok',
            result
          }
        }
      }, 'text', 'json')
    ::inputHandler(uppercase, 'inHandler')

    const handler = await main.loadHandler({})
    const json = await handler({}, 'hello')

    json.status.should.equal('ok')
    json.result.should.equal('HELLO!')
  })

  it('config override', async function() {
    const main = simpleHandlerBuilder(
      config => {
        config.foo.should.equal('bar')

        return args => 'hello'
      }, 'void', 'text')
    ::configOverride({
      foo: 'bar'
    })

    const config = {
      foo: 'foo'
    }

    await main.loadHandler(config)
  })

  it('config alias', async function() {
    const main = simpleHandlerBuilder(
      config => {
        config.foo.should.equal('bar')

        return args => 'hello'
      }, 'void', 'text')
    ::configAlias({
      foo: 'bar'
    })

    const config = {
      bar: 'bar'
    }

    await main.loadHandler(config)
  })
})
