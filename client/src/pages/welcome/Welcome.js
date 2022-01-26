import React from "react";
import { useNavigate, Link } from 'react-router-dom'

function Welcome({state, sourceFunctions: {handleLogout}}) {

    const navigate = useNavigate()
    console.log(state);
    if(state){
        return (
            <>
                <h1>Round Table Games</h1>
                <nav>
    
                <p>Hello {state.user.username}</p>
             
            
                <span onClick={handleLogout}>Logout</span>
                <Link to='/account'>User Settings</Link>
                <Link to='/game-config/step-1'>Create Game</Link>
                    
                </nav>
            </>
        )
    } else {
        return (
            <>
                <h1>Round Table Games</h1>
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </nav>
            </>
        )

    }
}

export default Welcome
