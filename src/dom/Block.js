import {EventBus} from './EventBus'

const EVENTS = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU: 'flow:component-did-update',
  FLOW_SCU: 'flow:should-component-update',
  FLOW_RENDER: 'flow:render',
}

export class Block {
  constructor(props) {
    const eventBus = new EventBus()
    this._id = '123'
    this.props = this.makePropsProxy(props)
    this.eventBus = () => eventBus
    this.registerEvents(eventBus)
    eventBus.emit(EVENTS.INIT)
  }

  get id() {
    return this._id
  }

  get element() {
    return this._element
  }

  makePropsProxy(props) {
    const self = this

    return new Proxy(props, {
      get(target, prop, receiver) {
        if (prop.startsWith('_')) {
          throw new Error('Нет прав')
        } else {
          const value = Reflect.get(target, prop, receiver)
          return typeof value === 'function' ? value.bind(target) : value
        }
      },
      set(target, prop, receiver) {
        if (prop.startsWith('_')) {
          throw new Error('Нет прав')
        } else {
          const oldProps = {...self.props}
          Reflect.set(target, prop, receiver)
          self.eventBus().emit(EVENTS.FLOW_CDU, oldProps, target)
          self.eventBus().emit(EVENTS.FLOW_SCU, oldProps, target)
          return true
        }
      },
      deleteProperty() {
        throw new Error('Нет прав')
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => !key.startsWith('_'))
      },
    })
  }

  registerEvents(eventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this))
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_SCU, this._shouldComponentDidUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  createResources() {
    this._element = document.createElement('div')
  }

  init() {
    this.createResources()
    this.eventBus().emit(EVENTS.FLOW_CDM)
  }

  _componentDidMount() {
    this.componentDidMount(this.props)
    this.eventBus().emit(EVENTS.FLOW_RENDER)
  }

  _shouldComponentDidUpdate(prevProps, newProps) {
    const response = this.shouldComponentDidUpdate(prevProps, newProps)
    if (response) this._render()
  }

  _componentDidUpdate(prevProps, newProps) {
    this.componentDidUpdate(prevProps, newProps)
  }

  _render() {
    const component = this.render()
    const wrapper = document.createElement('div')

    if (this._element) {
      wrapper.innerHTML = component
      this._element =
        wrapper.childElementCount > 1 ? wrapper : wrapper.firstElementChild

      this._element.setAttribute('_key', this.id)
    }
  }

  renderToString() {
    const wrapper = document.createElement('div')
    if (this._element) {
      wrapper.appendChild(this._element)
      return wrapper.innerHTML
    }
  }

  componentDidMount(oldProps) {}

  shouldComponentDidUpdate(prevProps, newProps) {
    return true
  }

  componentDidUpdate(oldProps, newProps) {}

  getContent = () => this.element

  setProps = (nextProps) => {
    if (!nextProps) return

    Object.assign(this.props, nextProps)
  }

  show() {
    if (this.element) this.element.style.display = 'block'
  }

  hide() {
    if (this.element) this.element.style.display = 'none'
  }
}
