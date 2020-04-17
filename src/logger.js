import { createLogger } from 'redux-logger'
import Immutable from 'immutable'

const noopMiddleware = () => next => action => next(action)

// https://github.com/evgenyrodionov/redux-logger#transform-immutable-with-combinereducers
const stateTransformer = state => {
  const newState = {}

  for (let i of Object.keys(state)) {
    newState[i] = Immutable.Iterable.isIterable(state[i])
      ? state[i].toJS()
      : state[i]
  }

  return newState
}

export default ({ devToolsExtension }) => {
  const logger = createLogger({ stateTransformer, collapsed: true, diff: true })
  return devToolsExtension ? noopMiddleware : logger
}
