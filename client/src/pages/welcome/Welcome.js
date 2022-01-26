import React from "react";
import { useNavigate, Link } from 'react-router-dom'

function Welcome({state, sourceFunctions: {handleLogout}}) {

    const navigate = useNavigate()
    console.log(state);
    return (
        <>
            <h1>Round Table Games</h1>
            <nav>

            {state && <p>Hello {state.user.username}</p>}
            {!state && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
            {state && (
                <>
                    <span onClick={handleLogout}>Logout</span>
                    <Link to='/account'>User Settings</Link>
                    <Link to='/game-config'>Create Game</Link>
                </>
                )}
            </nav>
        </>
    )
}

export default Welcome
