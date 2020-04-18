import Immutable from 'immutable'
import sub from 'date-fns/sub'

export const CONFIG_TOGGLE = 'CONFIG_TOGGLE'
export const CONFIG_RANGE_CHANGE = 'CONFIG_RANGE_CHANGE'

const createRangeOptions = () => [
  {
    name: '12 h',
    start: sub(new Date(), { hours: 12 }).toISOString(),
    end: new Date().toISOString()
  },
  {
    name: '24 h',
    start: sub(new Date(), { hours: 24 }).toISOString(),
    end: new Date().toISOString()
  },
  {
    name: '7 d',
    start: sub(new Date(), { days: 7 }).toISOString(),
    end: new Date().toISOString()
  },
  {
    name: '1 m',
    start: sub(new Date(), { months: 1 }).toISOString(),
    end: new Date().toISOString()
  }
]

const initialState = Immutable.fromJS({
  showNicknames: true,
  range: createRangeOptions()[1],
  rangeOptions: createRangeOptions(),
  chart: {
    height: 350
  }
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return state.merge({
        range: createRangeOptions()[1],
        rangeOptions: createRangeOptions()
      })
    case CONFIG_RANGE_CHANGE:
      return state.merge({
        range: action.range
      })
    case CONFIG_TOGGLE:
      return state.update(action.property, value => !value)
    default:
      return state
  }
}

export default reducer

export const toggle = property => ({
  type: CONFIG_TOGGLE,
  property
})

export const changeRange = range => dispatch => {
  dispatch({
    type: CONFIG_RANGE_CHANGE,
    range
  })
}
