import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {

    const navigate = useNavigate()

    const { currentUser, initialized} = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (initialized && !currentUser) {
            navigate("/signin");
        }
    }, [initialized, currentUser, navigate]);
    
    if (!initialized) {
        return <h1>Loading...</h1>;
    }
    return (
        <div><Outlet/></div>
    )
}

export default ProtectedRoute