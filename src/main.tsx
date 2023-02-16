import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles/reset.less"
import "./assets/fonts/font.less"
import "./assets/iconfont/iconfont.less"
import "../src/styles/common.less";
import "../src/language/index";
// import "virtual:svg-icons-register";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
