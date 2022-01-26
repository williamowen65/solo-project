import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage(props) {
    const navigate = useNavigate()

    return (
        <>
            <h1>404</h1>
            <p>This page either doesn't exist or you are not logged in</p>
            <button onClick={() => navigate('/')}>Go to home page</button>
        </>
    )
}
