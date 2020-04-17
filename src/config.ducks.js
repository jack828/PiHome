import Immutable from 'immutable'
import sub from 'date-fns/sub'

export const CONFIG_UPDATE = 'CONFIG_UPDATE'
export const CONFIG_TOGGLE = 'CONFIG_TOGGLE'

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
    height: '350px'
  }
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return state.merge({
        range: createRangeOptions()[1],
        rangeOptions: createRangeOptions()
      })
    case CONFIG_UPDATE:
      return state.merge({
        ...action.data
      })
    case CONFIG_TOGGLE:
      return state.update(action.property, value => !value)
    // setConfig(prevState => ({
    // ...prevState,
    // range: {
    // ...prevState.range,
    // ...option
    // }
    // }))
    // reloadCharts(option)
    default:
      return state
  }
}

export default reducer

export const toggle = property => ({
  type: CONFIG_TOGGLE,
  property
})

export const save = data => ({
  type: CONFIG_UPDATE,
  data
})
