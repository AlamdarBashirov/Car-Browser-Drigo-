import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { currentUser, initialized } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (initialized && !currentUser) {
            navigate("/signin", { state: { from: location }, replace: true });
        }
    }, [initialized, currentUser, navigate, location]);
    
    if (!initialized) {
        return <h1>Loading...</h1>;
    }

    return (
        <div><Outlet/></div>
    )
}

export default ProtectedRoute