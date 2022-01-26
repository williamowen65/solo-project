import React from 'react'
import { DetailsField } from '../../components/detailsField/DetailsField'

export function UserSettings({state, sourceFunctions }) {
    
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
                {/* <DetailsField name={'Your games'} value={userGames} sourceFunctions={sourceFunctions} /> */}
            </>
        )
    }
    return null
}
