import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()

    const { currentUser, initialized} = useSelector((state) => state.auth)
    console.log("protected", currentUser);
    
    useEffect(() => {
        if (initialized && !currentUser) {
            navigate("/signin");
        }
    }, [initialized, currentUser, navigate]);
    
    if (!initialized) {
        return <h1>Loading...</h1>;
    }
    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute