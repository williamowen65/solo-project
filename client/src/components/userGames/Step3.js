import React from 'react'

export function Step3({customizeFunctions: {handleNext, handleBack}}) {
    

    return (
       <div className='modal'>
                <h2>Rules</h2>
                <ul>
                    <li></li>
                </ul>


                
                <label htmlFor="title">
                    
                    <input type="text" name="title" id="title" />
                </label>
               
                <div className="btns">
                    <div className="btn" onClick={handleBack}>Back</div>
                    <div className="btn" onClick={handleNext}>Next</div>
                </div>
        </div>
    )
}
