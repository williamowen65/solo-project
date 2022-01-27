import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { Step1 } from '../../components/userGames/Step1'
import { Step2 } from '../../components/userGames/Step2'
import { Step3 } from '../../components/userGames/Step3'
import { Table } from '../../components/userGames/Table'
import { createGame } from '../../utils/helper-functions'

export function CustomizeGame({state, sourceFunctions: {createNewGame}}) {
    const location = useLocation()
    const navigate = useNavigate()
    const [localState, setLocalState] = useState({ step: 0})

    const customizeFunctions = {
        handleEditMode: (e) => {
            e.target.parentNode.classList.toggle('edit')
        },
        handleNext: () => {
            setLocalState({
                ...localState,
                step: localState.step + 1
            })
        },
        handleBack: () => {
            setLocalState({
                ...localState,
                step: localState.step - 1
            })
        },
        handleFormInfo: (e) => {
            const name = e.target.id
            const value = e.target.value
            const updates = {...localState}
            updates[name] = value
            setLocalState(updates)
        }
    }

    useEffect(() => {
        // if(localState.createMode){
            const pathArr = location.pathname.split('/')
            const path = pathArr[pathArr.length - 1]
            console.log(path);
            switch (path) {
                case 'new':
                    setLocalState({createMode: true, step: 1})
                    break;
                case 'games':
                    setLocalState({createMode: false, step: 0})
                    break;
                default:
                    // setStep(0)
                    break;
            }
        // }

    }, [location.pathname])
  
    const handleSubmit = (e) => {
        e.preventDefault()
        const game = {
            title: localState.title,
            desc: localState.desc
        }
        createGame(game)
        navigate('/user/games')
    }

    return (
        <>
            {localState.step === 0 && <Table customizeFunctions={customizeFunctions} state={state}/>}
            {localState.createMode && (
                <>
                    <header className='your-games'>
                        <h1>Create Game</h1>
                    </header>
                    <form onSubmit={handleSubmit}>
                        {localState.step === 1 && <Step1 customizeFunctions={customizeFunctions}/>}
                        {localState.step === 2 && <Step2 customizeFunctions={customizeFunctions}/>}
                        {localState.step === 3 && <Step3 customizeFunctions={customizeFunctions}/>}
                    </form>
                </>
            )}
        </>
    )
}
