import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from "react/cjs/react.development";
import Card from "../../components/card/Card";
import {assignAngles, frontPageCards} from '../../components/card/cardLogic';

function Welcome({state, sourceFunctions: {handleLogout}}) {

    const navigate = useNavigate()
    console.log(state);

    const [cards, setCards] = useState([])
    useEffect(() => {
        const length = frontPageCards.length
        const myCards = assignAngles(length, null, frontPageCards)
        setCards(myCards)
    }, [])
    // console.log(cards);

    if(state){
        return (
            <>
                <h1>Round Table Games</h1>
                <p>Hello {state.user.username}</p>
                <nav>
                    <span onClick={handleLogout}>Logout</span>
                    <Link to='/account'>User Settings</Link>
                    <Link to='/game-config/step-1'>Create Game</Link> 
                </nav>
                <div className="cardContainer">
                    {cards}
                </div>
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
