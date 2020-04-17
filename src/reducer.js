import { combineReducers } from 'redux'
import data from './data.ducks.js'
import node from './node.ducks.js'
import config from './config.ducks.js'

const reducer = combineReducers({ data, node, config })

export default (state, action) => {
  if (action.type === 'RESET_ALL') {
    state = undefined
  }
  return reducer(state, action)
}
