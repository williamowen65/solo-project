import Card from "./Card";
import React from "react";
import sprite from '../../assets/imgs/cardsSprite.png';

// console.log(sprite);

export const frontPageCards = [
                ['A', 'hearts'], 
                ['queen', 'spades'], 
                ['5','spades'],
                ['jack', 'hearts'], 
                ['7','clubs'],
                ['3','diamonds'],
                ['5', 'hearts']
            ]

const suits = {
    hearts: 0,
    clubs: 1,
    spades: 2,
    diamonds: 3
}
const spriteCoordinates = {
    king: ['-1946px -19px', '-1946px 467px','-1946px 231px','-1946px 707px'],
    queen: ['-1801px -19px', '-1801px 467px','-1801px 231px','-1801px 707px'],
    jack: ['-1638px -19px', '-1638px 467px','-1638px 231px','-1638px 707px'],
    10: ['-1476px -19px', '-1476px 467px','-1476px 231px','-1476px 707px'],
    9: ['-1313px -19px', '-1313px 467px','-1313px 231px','-1313px 707px'],
    8: ['-1151px -19px', '-1151px 467px','-1151px 231px','-1151px 707px'],
    7: ['-988px -19px', '-988px 467px','-988px 231px','-988px 707px'],
    6: ['-825px -19px', '-825px 467px','-825px 231px','-825px 707px'],
    5: ['-663px -19px', '-663px 467px','-663px 231px','-663px 707px'],
    4: ['-500px -19px', '-500px 467px','-500px 231px','-500px 707px'],
    3: ['-338px -19px', '-338px 467px','-338px 231px','-338px 707px'],
    2: ['-175px -19px', '-175px 467px','-175px 231px','-175px 707px'],
    A: ['-13px -19px', '-13px 467px','-13px 231px', '-13px 707px']
}

export function assignAngles(myCardCount, opponent, myCardData) {
    // console.log(myCardData);
    const bounds = [-45, 45]
    const difference = (bounds[0] * -1) + bounds[1]
    const factor = difference /myCardCount
    let end = bounds[0]
    // console.log(myCardCount);
    const myCards = []

    for(let i = 0; i < myCardCount; i++){
        const styles = {
            transform: `rotate(${0}deg) translate(-50%,-50%)`,
            backgroundImage: `url(${sprite})`
        }
        const animateTo = `rotate(${end}deg) translate(-50%,-50%)`
        end += factor
        if(opponent){
            myCards.push(<Card styles={styles} key={i} classes={'opponent'}/>)
        } else {
            let myData = myCardData[i]
            styles.backgroundPosition = spriteCoordinates[myData[0]][suits[myData[1]]]
            myCards.push(<Card styles={styles} key={i} classes={'myHand'} animateTo={animateTo}/>)
        }
    }

    return myCards
}


export function composeDecks(deckData, options) {
    const possibleOptions = {
        mulitpleDecks: true,
        splitDeck: true,
    }
    // console.log(deckData);

    const decks = deckData.map(deck => {
        const {
            coordinates,
            numCards,
            id
        } = deck

        const styles = { 
            gridRow: coordinates[0],
            gridColumn: coordinates[1],
            transform: undefined
        }

        let valuesX = [0]
        let valuesY = [0]

        for(let i = 0; i < 52; i++){
            valuesX.push(valuesX[valuesX.length - 1] - 0.25)
            valuesY.push(valuesY[valuesY.length - 1] - 0.125)
        }
        
        // console.log(test);
        const thisDeck = []
        /// run another map and return is based on number of cards in deck
        for (let i = 0; i < numCards; i++){
            const x = valuesX[i]
            const y = valuesY[i]
            console.log(x,y);
            const myStyles = {...styles}
            myStyles.transform = `translate(${x}px, ${y}px) rotate(-355deg)`
         
            console.log(thisDeck);
            thisDeck.push(<Card styles={myStyles} classes={'tableCard'} key={i}/>)
        }
        console.log(thisDeck);


        return thisDeck
    })

    return decks
    // console.log(cardData);
    // return <Card />
    //cardData => number
    //Use css to give a stacking effect.
    
}