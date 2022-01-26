import React from 'react'

export function CustomizeGame(props) {
    

    return (
        <>
        <header className='your-games'>
            <h1>Your games</h1>
            <button>Create New Game</button>
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
                    <tr className='edit'>
                        <td></td>
                        <td>data</td>
                        <td>datadfs</td>
                        <td>data</td>
                        <td>datasss</td>
                    </tr>
                </tbody>          
            </table>  
        </>
    )
}
