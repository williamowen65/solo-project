import React from 'react'

function TableRow({datas,  customizeFunctions: {handleEditMode}}) {
    const data = {
        title: 'test',
        description: 'fsdfd',
        rules: 'dfsdfd',
        setup: 'dfdfsd',
        status: 'private'
    }
    return (
        <tr>
            <input type="checkbox" onChange={handleEditMode}/>
            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.rules}</td>
            <td>{data.setup}</td>
            <td>{data.status}</td>
        </tr>
    )
}

export function Table({state, customizeFunctions}) {
    const {startPrompt} = customizeFunctions
    const games = []
    console.log(state);
    state.user.userGames.forEach((game, i) => {
        games.push(<TableRow key={i} data={game}/>)
    })

    console.log(games);

    return (
        <>
            <header className='your-games'>
                <h1>Your games</h1>
                <button onClick={startPrompt}>Create New Game</button>
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
                   {/* <TableRow  customizeFunctions={customizeFunctions}/>
                   <TableRow  customizeFunctions={customizeFunctions}/>
                   <TableRow  customizeFunctions={customizeFunctions}/> */}
                </tbody>          
            </table>  
        </>
    )
}
