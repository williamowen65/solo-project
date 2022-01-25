import React from "react";
import { useNavigate } from 'react-router-dom'

function Welcome(props) {

    const navigate = useNavigate()

    return (
        <>
            <div>WELCOME</div>
            <button onClick={() => navigate('/hi')}>Hi</button>
        </>
    )
}

export default Welcome
