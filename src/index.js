// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import enUS from 'antd/lib/locale-provider/en_US'
import { LocaleProvider } from 'antd'
import * as actions from './state/actions'
import './index.css'
import isOnline from './utils/isOnline'
import store from './state/store'

// only request data from the server if it is running locally
if (!isOnline) {
  store.dispatch(actions.loadData())
}
global.store = store //DEBUG

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)
