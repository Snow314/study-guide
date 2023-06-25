import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './flashcard.css'

const Flashcard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flashcard-container">
            <div
                className={`card ${isFlipped ? 'card-flipped' : ''}`}
                onClick={flipCard}
            >
                <div className="card-inner">
                    <div className="card-front">
                        <div className="card-header">Question</div>
                        <div className="card-body">What is the capital of France?</div>
                    </div>
                    <div className="card-back">
                        <div className="card-header">Answer</div>
                        <div className="card-body">Paris</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard
