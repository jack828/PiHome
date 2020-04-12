import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import { dom } from '@fortawesome/fontawesome-svg-core'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faMinus,
  faCheck,
  faExclamationTriangle,
  faTimes,
  faTerminal,
  faEdit,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faMinus,
  faCheck,
  faExclamationTriangle,
  faTimes,
  faTerminal,
  faEdit,
  faEye,
  faEyeSlash
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

dom.watch()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
