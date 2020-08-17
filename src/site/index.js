import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import Snabbdom from 'snabbdom-pragma'
import './index.less'
import Icon from '../ring/lib/icon'
import { AccountBookFilled } from '@ant-design/icons-svg/es'

function Site (source) {
  const localDom$ = xs.of(<h1>Hello world!</h1>)
  const { DOM: IconDom$, click: IconClick$ } = Icon({
    props: xs.of({ type: AccountBookFilled, size: 24 }),
    DOM: source.DOM
  })

  IconClick$.addListener({
    next: evt => console.log(evt)
  })

  const sinks = {
    DOM: xs.combine(IconDom$, localDom$)
      .map(([icon, local]) => {
        return (
          <div className="hello">
            {icon}
            {local}
          </div>
        )
      })
  }

  return sinks
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(Site, drivers)
