import React, { Fragment, lazy, memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
const NotFound = lazy(() => import('./components/not-found'))
const Auth = lazy(() => import('./pages/auth'))
const Login = lazy(() => import('./pages/login'))
const Dashboard = lazy(() => import('./pages/dashboard'))

const App = () => {
  const token = useSelector((state) => state.auth.token)

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/dashboard" : " / login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />} >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  )
}

export default memo(App)