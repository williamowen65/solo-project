import React, { useState } from 'react'

export function DetailsField({name, value, sourceFunctions: { handleUpdateUser }}) {
    const [isEditing, setIsEditing] = useState(false)

    const updateField = () => {
        const field = {
            name,
            value
        }
        handleUpdateUser(field)
        setIsEditing(!isEditing)
    }

    const controlValue = (e) => {
        // console.log(e.target.value);
        value = e.target.value
    }

    const handleEnter = (e) => {
        if(e.code === 'Enter'){
            updateField()
        }
    }
   
    return (
        <>
    <label>
        {name}
        {isEditing ? 
            <input type="text" placeholder={value} onChange={controlValue} onKeyPress={handleEnter} /> :
            <input type="text" value={value} disabled/> 
        }
        {isEditing ?
            <span onClick={updateField}>save</span> :
            <span onClick={() => setIsEditing(!isEditing)}>edit</span>
        }
    </label>
    </>

        )

}
