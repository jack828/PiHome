import Immutable from 'immutable'

export const NODE_LOAD = 'NODE_LOAD'
export const NODE_SAVE = 'NODE_SAVE'
export const NODE_LOAD_SUCCESS = 'NODE_LOAD_SUCCESS'
export const NODE_LOAD_FAIL = 'NODE_LOAD_FAIL'

const initialState = Immutable.fromJS({
  loading: true,
  error: null,
  nodes: null
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return state.merge({
        loading: true,
        error: null
      })
    case NODE_SAVE:
      return state.merge({
        loading: true,
        error: null
      })
    case NODE_LOAD:
      return state.merge({
        loading: true,
        error: null
      })
    case NODE_LOAD_SUCCESS:
      return state.merge({
        loading: false,
        error: null,
        nodes: action.nodes
      })
    case NODE_LOAD_FAIL:
      return state.merge({
        loading: false,
        error: action.error
      })
    default:
      return state
  }
}

export default reducer

export const loadNodes = () => async (dispatch, getState) => {
  dispatch({ type: NODE_LOAD })
  try {
    const res = await fetch(`/api/nodes`, {
      method: 'GET'
      // headers: {
      // 'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({ from, to })
    })
    const data = await res.json()
    if (res.status === 200) {
      return dispatch({
        type: NODE_LOAD_SUCCESS,
        nodes: data
      })
    }
    // all else fails, we have errored
    dispatch({ type: NODE_LOAD_FAIL, error: data.error })
  } catch (error) {
    console.error(error)
    return dispatch({
      type: NODE_LOAD_FAIL,
      error: 'There was an issue doing that. Please try again later.'
    })
  }
}

export const save = (data) => async(dispatch, getState) => {
  dispatch({ type: NODE_SAVE })
  try {
    const res = await fetch(`/api/node`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const response = await res.text()
    console.log(response)
    if (res.status === 200) {
      return dispatch(loadNodes())
    }
    return // TODO
    // all else fails, we have errored
    dispatch({ type: NODE_LOAD_FAIL, error: response })
  } catch (error) {
    console.error(error)
    return // TODO
    return dispatch({
      type: NODE_LOAD_FAIL,
      error: 'There was an issue doing that. Please try again later.'
    })
  }
}
