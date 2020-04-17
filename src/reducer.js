import { combineReducers } from 'redux'
import data from './data.ducks.js'

const reducer = combineReducers({ data })

export default (state, action) => {
  if (action.type === 'RESET_ALL') {
    state = undefined
  }
  return reducer(state, action)
}
