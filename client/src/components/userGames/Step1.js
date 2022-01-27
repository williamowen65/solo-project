import React from 'react'
// import { DetailsField } from '../../pages/auth/detailsField/DetailsField'

export function Step1({customizeFunctions: {handleNext}}) {
    

    return (
        <div className='modal'>
                <h2>Basics</h2>
                <label htmlFor="title">
                    Title
                    <input type="text" name="title" id="title" />
                </label>
                <label htmlFor="desc">
                    Description
                    <textarea name="desc" id="desc" cols="30" rows="10"></textarea>
                </label>
                <div className="btns right">
                    <div className="btn" onClick={handleNext}>Next</div>
                </div>
        </div>
    )
}
