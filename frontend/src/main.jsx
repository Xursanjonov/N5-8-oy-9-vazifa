import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './context/index'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Loader from './components/loader'

const App = lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
