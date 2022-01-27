import React from 'react'

export function Step3({customizeFunctions: {handleNext, handleBack}}) {
    

    return (
       <div className='modal'>
                <h2>Rules</h2>
                <ul>
                    <li>Turn actions</li>
                </ul>

               
                <div className="btns">
                    <div className="btn" onClick={handleBack}>Back</div>
                    <button>Create</button>
                </div>
        </div>
    )
}
