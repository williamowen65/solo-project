import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DetailsField } from '../../components/detailsField/DetailsField'

export function UserSettings({state, sourceFunctions }) {
    
    const navigate = useNavigate()

    if(state) {
        const {
            user: {
                username,
                email,
                userGames
            }
        } = state
        return (
            <>
                <h1>User Settings</h1>
                <DetailsField name={'username'} value={username} sourceFunctions={sourceFunctions} />
                <DetailsField name={'email'} value={email} sourceFunctions={sourceFunctions} />
                <button onClick={() => navigate('/user/games')}>Go to your games</button>
                {/* <DetailsField name={'Your games'} value={userGames} sourceFunctions={sourceFunctions} /> */}
            </>
        )
    }
    return null
}
