import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roles }) {
    const { user, loading } = useContext(AuthContext)

    if (loading) return <div>Loading...</div>;

    if(!user) return <Navigate to="/login" replace/>

    if(roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace/>
    }
  return (
    children
  )
}

export default ProtectedRoute