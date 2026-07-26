import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()

    const { currentUser } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin")
        }
    }, [currentUser, navigate])
    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute