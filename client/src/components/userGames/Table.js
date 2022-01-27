import React from 'react'
import { useNavigate } from 'react-router-dom'

/// THERE ARE TWO COMPONENTS ON THIS PAGE

function TableRow({game: {
    title,
    description,
    rules,
    setup,
    metadata: {
        rating,
        status
    }
},  customizeFunctions: {handleEditMode}}) {
  
    return (
        <tr>
            <input type="checkbox" onChange={handleEditMode}/>
            <td>{title}</td>
            <td>{description}</td>
            <td>rules</td>
            <td>setup</td>
            <td>{status}</td>
        </tr>
    )
}

export function Table({state, customizeFunctions}) {
    const navigate = useNavigate()
    const games = []
    console.log(state);
    if(state.games){
        state.games.userGames.forEach((game, i) => {
            games.push(<TableRow key={i} game={game} customizeFunctions={customizeFunctions}/>)
        })
    }

    console.log(games);

    return (
        <>
            <header className='your-games'>
                <h1>Your games</h1>
                <button onClick={() => navigate('/user/games/new')}>Create New Game</button>
            </header>
            <table>
                <thead>
                    <tr>
                        <td id='edit'>edit</td>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Rules</td>
                        <td>Setup</td>
                        <td>Status</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {games}
                </tbody>          
            </table>  
        </>
    )
}
