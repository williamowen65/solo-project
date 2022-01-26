import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { Step1 } from '../../components/gameConfigSteps/Step1'
import { Step2 } from '../../components/gameConfigSteps/Step2'

export function GameConfig(props) {
    const location = useLocation()
    const [step, setStep] = useState(1)

    useEffect(() => {
        const step = location.pathname.split('/')[2]
        // console.log(step);
        switch (step) {
            case 'step-1':
                setStep(1)
                break;
            case 'step-2':
                setStep(2)
                break;
            default:
                break;
        }
    }, [location.pathname])

    const configFunctions = {
        setStep
    }

    return (
        <>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2/>}
        </>
    )
}
