import React, { useState } from 'react'
import { Modal } from '../../components/userGames/Modal'
import { Table } from '../../components/userGames/Table'

export function CustomizeGame({state, sourceFunctions: {createNewGame}}) {
    
    const [localState, setLocalState] = useState({ createMode: false })

    const customizeFunctions = {
        handleEditMode: (e) => {
            e.target.parentNode.classList.toggle('edit')
        },
        startPrompt: () => {
            setLocalState({createMode: true})
        }
    }

  


    return (
        <>
           
            {!localState.createMode && <Table customizeFunctions={customizeFunctions} state={state}/>}
            {localState.createMode && <Modal />}
        </>
    )
}
