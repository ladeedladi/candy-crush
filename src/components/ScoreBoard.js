import React from 'react'

const ScoreBoard = ({score}) => {
    return (
        <div className="scoreCard">
            
            <h1>scorecard</h1>
            <h3>{score}</h3>
        </div>
    )
}

export default ScoreBoard
