import React from 'react'

export function Table({customizeFunctions: {handleEditMode}}) {
    

    return (
        <>
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
                    <tr>
                        <input type="checkbox" onChange={handleEditMode}/>
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
