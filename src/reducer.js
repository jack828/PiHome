import { combineReducers } from 'redux'
const test = () => f => f

const reducer = combineReducers({ test })

export default (state, action) => {
  if (action.type === 'RESET_ALL') {
    state = undefined
  }
  return reducer(state, action)
}
