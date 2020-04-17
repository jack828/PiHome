import Immutable from 'immutable'

export const CHART_LOAD = 'LOGIN'
export const CHART_LOAD_SUCCESS = 'CHART_LOAD_SUCCESS'
export const CHART_LOAD_FAIL = 'CHART_LOAD_FAIL'

const initialState = Immutable.fromJS({
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

const formatDatasets = (data, config) => {
  const { showNicknames } = config
  const datasets = []

  if (!data) return data
  data.forEach(node => {
    const data = node.data.map(({ createdDate, value }) => ({
      x: new Date(createdDate),
      y: value
    }))
    datasets.push({
      fill: false,
      showLine: true,
      pointRadius: 0.5,
      backgroundColor: node.colour,
      borderColor: node.colour,
      pointStyle: 'line',
      label: (showNicknames && node.nickname) || node.nodeId,
      data
    })
  })

  return datasets
}

export const loadData = ({ sensor, config }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: CHART_LOAD, sensor })
  try {
    const { start, end } = config.range
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
        datasets: formatDatasets(data, config)
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
