import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
    let token = useSelector((state) => state.auth.token)
    return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default memo(Auth)