import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'
import Immutable from 'immutable'
import installDevTools from 'immutable-devtools'
import createLogger from './logger'
import rootReducer from './reducer'

installDevTools(Immutable)

const persistConfig = {
  key: 'primary',
  version: 1,
  storage,
  transforms: [immutableTransform()],
  blacklist: []
}
const reducer = persistReducer(persistConfig, rootReducer)
const middleware = [thunkMiddleware, createLogger(window)]

export default () =>
  new Promise(resolve => {
    const store = createStore(
      reducer,
      undefined,
      compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )
    const persistor = persistStore(store, null, () =>
      resolve({ store, reducer, persistor })
    )
  })
