import React from 'react'
// import { DetailsField } from '../../pages/auth/detailsField/DetailsField'

export function Step1({customizeFunctions: {handleNext, handleFormInfo}}) {
    

    return (
        <div className='modal'>
                <h2>Basics</h2>
                <label htmlFor="title">
                    Title
                    <input type="text" name="title" id="title" onChange={handleFormInfo} />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea name="description" id="description" cols="30" rows="10" onChange={handleFormInfo}></textarea>
                </label>
                <div className="btns right">
                    <div className="btn" onClick={handleNext}>Next</div>
                </div>
        </div>
    )
}
