import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Step1() {
    const navigate = useNavigate()

    return (
        <>
                <h1>Step 1</h1>

            <div className="step1">
                <div>
                    <h2>Choose a game</h2>
                    <select name="games" id="games" onChange={() => navigate('/game-config/step-2')}>
                        <option defaultValue="true" disabled>Select</option>
                        <option value="go-fish">Go Fish</option>
                        <option value="poker">Poker</option>
                        <option value="lucky">Lucky</option>
                        <option value="rummy">Rummy</option>
                    </select>
                    

                    <h2>Your custom games</h2>
                    <select name="your-games" id="your-games">
                        <option defaultValue='true' disabled>Select</option>
                        <option value="none">none yet</option>
                    </select>


                    <h2>Other users games</h2>
                    <select name="" id="">
                        <option defaultValue='true' disabled>Select</option>
                        <option value="none">none yet</option>
                    </select>
                </div>
                
                <div>
                    <h2>Or define your own rules</h2>
                    <button>Try it out</button>
                </div>
            </div>
        </>
    )
}
