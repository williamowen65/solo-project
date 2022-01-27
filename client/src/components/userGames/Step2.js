import React from 'react'

export function Step2({customizeFunctions: {handleNext, handleBack}}) {
    

    return (
       <div className='modal'>
                <h2>Setup</h2>
                <ul>
                    <li>Deck Info
                        <ul>
                            <li>number of decks
                                <ul>
                                    <li>input decks</li>
                                    <li>output decks</li>
                                </ul>
                            </li>
                            <li>placement of decks
                                <ul>
                                    <li>input decks</li>
                                    <li>output decks</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        players info
                        <ul>
                            <li>Number of players allowed</li>
                            <li>Turn basis</li>
                            <li>hand
                                <ul>
                                    <li>how many cards to start with</li>
                                    <li>how many cards max</li>
                                    <li>how many cards min</li>
                                </ul>
                            </li>
                            <li> table
                                <ul>
                                    <li>where to place cards</li>
                                </ul>
                            </li>
                            <li> round actions
                                <ul>
                                    <li>options
                                        <ul>
                                            <li>pick up</li>
                                            <li>play a number of cards</li>
                                            <li>call on a player</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>


                {/* 
                <label htmlFor="title">
                    
                    <input type="text" name="title" id="title" />
                </label> */}
               
                <div className="btns">
                    <div className="btn" onClick={handleBack}>Back</div>
                    <div className="btn" onClick={handleNext}>Next</div>
                </div>
        </div>
    )
}
