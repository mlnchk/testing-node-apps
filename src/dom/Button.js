import Handlebars from 'handlebars'

import {Block} from './Block'

const source = `
<button
    class="{{className}}"
    type="{{type}}"
>
    {{text}}
</button>`

export class Button extends Block {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props
    const type = this.props.type ? this.props.type : 'button'
    const className =
      'btn shadow ' +
      `${props.intent || 'intent'}-btn ${props.size || 'small'} ` +
      this.props.className

    const template = Handlebars.compile(source)
    return template({...props, type, className})
  }
}
