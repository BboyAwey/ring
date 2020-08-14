import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import Snabbdom from 'snabbdom-pragma'

function Site () {
  console.log('HtmlWebpackCompiler:')
  const sinks = {
    DOM: xs.periodic(1000).map(i =>
      <h1>{'' + i + ' seconds elapsed'}</h1>
    )
  }

  return sinks
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(Site, drivers)
