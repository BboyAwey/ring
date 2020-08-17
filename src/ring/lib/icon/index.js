import xs from 'xstream'
import { h } from '@cycle/dom'
import Snabbdom from 'snabbdom-pragma'

const antd2snabbdom = item => {
  return h(
    item.tag,
    {
      attrs: item.attrs
    },
    item.children ? item.children.map(c => {
      return antd2snabbdom(c)
    }) : null
  )
}

function Icon (source) {
  const props$ = source.props || xs.of({
    type: {},
    size: 24
  })

  const sinks = {
    DOM: props$.map(prop => {
      if (prop.type) {
        return h('span', {
          class: { 'r-icon': true },
          style: { display: 'inline-block' }
        }, [
          h('svg', {
            attrs: {
              ...prop.type.icon.attrs,
              width: prop.size,
              height: prop.size,
              fill: 'currentColor'
            }
          }, prop.type.icon.children.map(c => antd2snabbdom(c)))
        ])
      } else return ''
    }),
    click: source.DOM.select('.r-icon').events('click')
  }

  return sinks
}

export default Icon
