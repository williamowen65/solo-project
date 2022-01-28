import React, { useRef } from 'react'
import { useEffect } from 'react/cjs/react.development';

export default function Card({styles, classes, animateTo}) {
    const thisCard = useRef()

    useEffect(() => {
        thisCard.current.animate([
            {transform: animateTo}
        ], {
            duration: 1000,
            fill: 'forwards'
        })
        console.log(thisCard.current);
    }, [thisCard.current])

    console.log(styles);
    // console.log(classes);
    return (
        <div ref={thisCard} className={`card ${classes}`} style={styles}>
        </div>
    )
}
