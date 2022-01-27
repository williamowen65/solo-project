import React from 'react'
import { useNavigate } from 'react-router-dom'

/// THERE ARE TWO COMPONENTS ON THIS PAGE

function TableRow({game: {
    title,
    description,
    rules,
    setup,
    _id,
    metadata: {
        rating,
        status
    }
},  customizeFunctions: {handleEditMode},
 sourceFunctions: {tableFunctions: {handleStatus}}}) {
  
    const handleClick = (e, id) => {
        if(document.getElementById(id).classList.contains('edit')){
            const classArray = [] 
            e.target.classList.forEach(el => classArray.push(el))
            const type = classArray.find(el => el.match(/title|description|rules|setup|status/))
            console.log(type);
            switch (type) {
                case 'status':
                    const payload = status === 'private' ? 'public' : 'private'
                    handleStatus(id, payload)
                    break;
            
                default:
                    break;
            }
        }
    }


    return (
        <tr onClick={(e) => handleClick(e, _id)} id={_id}>
            <input type="checkbox" onChange={handleEditMode}/>
            <td className='title'>{title}</td>
            <td className='preview description'>{description}</td>
            <td className='preview rules'>rules</td>
            <td className='preview setup'>setup</td>
            <td className='status'>{status}</td>
        </tr>
    )
}

export function Table({state, customizeFunctions, sourceFunctions}) {
    const navigate = useNavigate()
    const games = []
    console.log(state);
    if(state.games){
        state.games.userGames.forEach((game, i) => {
            games.push((
                <>
                <TableRow key={i} game={game} customizeFunctions={customizeFunctions} sourceFunctions={sourceFunctions}/>
                </>
            ))
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
