// @ts-nocheck
import React, { useCallback } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useValidateToken from '../hooks/useValidateToken'
import { Backdrop } from '@mui/material'

const ProtectedRoute = () => {

    // const isValid = true;
    // let isLoading;
    const { isValid, isLoading } = useValidateToken()

    const handleReturnHome = useCallback(() => {
        localStorage.removeItem("app_auth");
        window.location.href = "/";
    }, [])

    if (isLoading) {
        return <Backdrop
            sx={{
                zIndex: 1
            }}
            open={isLoading}
            invisible
        >
            {
                isLoading === true && isValid === true && <div>Loding....</div>
            }
            {isLoading === true && isValid === false && <button
                style={{
                    backgroundColor: "#1788ca",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                }}
                onClick={handleReturnHome} >Return Home</button>}
        </Backdrop>;
    }

    if (isLoading === true && isValid === false) {
        <Navigate to="/" replace />
    }

    return isValid === true ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute