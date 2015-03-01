const _id = Symbol('_id')
const _options = Symbol('_options')

// Random ID for easier identifying
const randomId = () =>
  Symbol((Math.random() * 0x10000000 | 0).toString(16))

export class Component {
  constructor(options={}) {
    const { 
      name,
      subComponents = { }
    } = options

    this[_id] = randomId()
    this[_options] = options

    if(name) {
      this.name = name
    }

    for(let key in subComponents) {
      const component = subComponents[key]
      if(!component.isQuiverComponent) {
        throw new Error('object must be of type Component')
      }
    }

    this._subComponents = subComponents
  }

  get id() {
    return this[_id]
  }

  get componentType() {
    return 'Component'
  }

  get isQuiverComponent() {
    return true
  }

  get subComponents() {
    return this._subComponents
  }

  addSubComponent(key, component) {
    if(!component.isQuiverComponent) {
      throw new Error('Subcomponent must be Quiver component')
    }

    const { subComponents } = this

    if(subComponents[key]) {
      throw new Error('Subcomponent already registered at given key')
    }

    subComponents[key] = component
  }

  getSubComponent(key) {
    return this.subComponents[key]
  }

  setName(name) {
    this.name = name
    return this
  }

  clone() {
    const newInstance = Object.create(Object.getPrototypeOf(this))
    const allKeys = [
      ...Object.getOwnPropertyNames(this), 
      ...Object.getOwnPropertySymbols(this)
    ]

    for(let key of allKeys) {
      newInstance[key] = this[key]
    }

    newInstance[_id] = randomId()

    return newInstance
  }

  applyMap(mapper, mapTable={}) {
    const currentId = this.id

    if(mapTable[currentId]) {
      return mapTable[currentId]
    }

    return mapTable[currentId] = mapper(this, mapTable)
  }

  map(mapper, mapTable={}) {
    const clone = this.clone()
    this.doMap(clone, mapper, mapTable)
    return clone
  }

  *[Symbol.iterator]() {
    let { subComponents } = this

    for(let key in subComponents) {
      let subComponent = subComponents[key]
      yield subComponent
      yield* subComponent
    }
  }

  each(iteratee) {
    const { subComponents } = this

    for(let key in subComponents) {
      iteratee(subComponents[key])
    }
  }

  doMap(target, mapper, mapTable) {
    const { subComponents } = this
    const newSubComponents = { }

    for(let key in subComponents) {
      const component = subComponents[key]

      newSubComponents[key] = component.applyMap(
        mapper, mapTable)
    }

    target._subComponents = newSubComponents
  }

  factory() {
    return (forkTable={}) =>
      this.fork(forkTable)
  }

  fork(forkTable={}) {
    return this.applyMap(
      (component, mapTable) =>
        component.map(
          (subComponent, mapTable) =>
            subComponent.fork(mapTable)
          , mapTable)
      , forkTable)
  }

  implement(componentMap) {
    for(let subComponent of this) {
      subComponent.implement(componentMap)
    }

    return this
  }
}