import React from "react";
import { useNavigate, Link } from 'react-router-dom'

function Welcome(props) {

    const navigate = useNavigate()

    return (
        <>
            <h1>Round Table Games</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </>
    )
}

export default Welcome
