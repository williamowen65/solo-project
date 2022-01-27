import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Step1({state: {
    games: {
        publicGames,
        userGames
    }
}}) {
    const navigate = useNavigate()

    // const [publicGames, setPublicGames] = useState()
    
    const yourGameTitles = userGames.map(doc => {
        return doc.title
    })

    return (
        <>
                <h1>Step 1</h1>

            <div className="step1">
                <div>
                    <h2>Choose a game</h2>
                    <select name="games" id="games" onChange={() => navigate('/game-config/step-2')}>
                        <option selected={true} disabled>Select</option>
                        <option value="go-fish">Go Fish</option>
                        <option value="poker">Poker</option>
                        <option value="lucky">Lucky</option>
                        <option value="rummy">Rummy</option>
                    </select>
                    

                    <h2>Your custom games</h2>
                    <select name="your-games" id="your-games">
                        <option selected={true} disabled>Select</option>
                        {userGames.map((doc, i) => (
                            <option value="none" key={i}>{doc.title}</option>
                        ))}
                    </select>


                    <h2>Other users games</h2>
                    <select name="" id="">
                        <option selected={true} disabled>Select</option>
                       
                         {publicGames.map((doc, i) => {
                            if(!yourGameTitles.some((title) => doc.title === title)){
                                return <option value="none" key={i}>{doc.title}</option>
                            }
                        })}
                    </select>
                </div>
                
                <div>
                    <h2>Or define your own rules</h2>
                    <button onClick={() => navigate('/user/games')}>Try it out</button>
                </div>
            </div>
        </>
    )
}
