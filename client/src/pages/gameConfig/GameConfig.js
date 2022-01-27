import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { Step0 } from '../../components/gameConfigSteps/Step0'
import { Step1 } from '../../components/gameConfigSteps/Step1'
import { Step2 } from '../../components/gameConfigSteps/Step2'

export function GameConfig({state}) {
    const location = useLocation()
    const [step, setStep] = useState(1)

    useEffect(() => {
        const step = location.pathname.split('/')[2]
        console.log(step);
        switch (step) {
            case 'step-1':
                setStep(1)
                break;
            case 'step-2':
                setStep(2)
                break;
            default:
                setStep(0)
                break;
        }
    }, [location.pathname])

    const configFunctions = {
        setStep
    }

    return (
        <>  
            {step === 0 && <Step0 />}
            {step === 1 && state.games && <Step1 state={state}/>}
            {step === 2 && <Step2/>}
        </>
    )
}
