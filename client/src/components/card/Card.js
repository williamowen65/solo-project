import React from 'react'

export default function Card({styles, classes}) {
    console.log(styles);
    // console.log(classes);
    return (
        <div className={`card ${classes}`} style={styles}>
        </div>
    )
}
