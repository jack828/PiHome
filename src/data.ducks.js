import Immutable from 'immutable'

export const CHART_LOAD = 'CHART_LOAD'
export const CHART_LOAD_SUCCESS = 'CHART_LOAD_SUCCESS'
export const CHART_LOAD_FAIL = 'CHART_LOAD_FAIL'

const initialState = Immutable.fromJS({
  sensors: [
    { name: 'temperature', title: 'Temperature', unit: 'C', yMin: 20, yMax: 30 },
    { name: 'pressure', title: 'Pressure', unit: 'hPa' },
    { name: 'humidity', title: 'Humidity', unit: '%' },
    { name: 'light', title: 'Light', unit: 'lux' }
  ],
  loading: {},
  error: {},
  data: {}
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return state.merge({
        loading: {},
        error: {}
      })
    case CHART_LOAD:
      return state.merge({
        loading: { ...state.get('loading'), [action.sensor]: true },
        error: { ...state.get('error'), [action.sensor]: null }
      })
    case CHART_LOAD_SUCCESS:
      return state.merge({
        loading: { ...state.get('loading'), [action.sensor]: false },
        error: { ...state.get('error'), [action.sensor]: null },
        data: { ...state.get('data'), [action.sensor]: action.datasets }
      })
    case CHART_LOAD_FAIL:
      return state.merge({
        loading: { ...state.get('loading'), [action.sensor]: false },
        error: { ...state.get('error'), [action.sensor]: action.error }
      })
    default:
      return state
  }
}

export default reducer

export const loadData = ({ sensor }) => async (dispatch, getState) => {
  const config = getState().config.toJS()
  dispatch({ type: CHART_LOAD, sensor })
  try {
    const { rangeKey, rangeOptions } = config
    const range = rangeOptions.find(({ name }) => name === rangeKey)
    const { start, end } = range
    const res = await fetch(`/api/sensor/${sensor}/${start}/${end}`, {
      method: 'GET'
      // headers: {
      // 'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({ from, to })
    })
    const data = await res.json()
    if (res.status === 200) {
      return dispatch({
        type: CHART_LOAD_SUCCESS,
        sensor,
        datasets: data //formatDatasets(data, config)
      })
    }
    // all else fails, we have errored
    dispatch({ type: CHART_LOAD_FAIL, sensor, error: data.error })
  } catch (error) {
    console.error(error)
    return dispatch({
      type: CHART_LOAD_FAIL,
      sensor,
      error: 'There was an issue doing that. Please try again later.'
    })
  }
}
