import React from 'react'
import { DetailsField } from '../../components/detailsField/DetailsField'

export function UserSettings({state, sourceFunctions }) {
    
    if(state) {
        const {
            username
        } = state
        return (
            <>
                <h1>User Settings</h1>
                <DetailsField name={'username'} value={username} sourceFunctions={sourceFunctions} />
            </>
        )
    }
    return null
}
