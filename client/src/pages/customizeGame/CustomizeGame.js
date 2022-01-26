import React from 'react'
import { Table } from '../../components/userGames/Table'

export function CustomizeGame(props) {
    
    
    const customizeFunctions = {
        handleEditMode: (e) => {
            e.target.parentNode.classList.toggle('edit')
        }
    }

    return (
        <>
            <header className='your-games'>
                <h1>Your games</h1>
                <button>Create New Game</button>
            </header>
            <Table customizeFunctions={customizeFunctions}/>
            
        </>
    )
}
