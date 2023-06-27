import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './flashcard.css'


const Flashcard = (props) => {

    return (
        <div className="flip-card m-3 d-flex align-items-center justify-content-center">
            <div className="flip-card-inner">
                <div className="flip-card-front border rounded border-light bg-dark text-white d-flex align-items-center justify-content-center">
                    <div class="overflow-auto"><h3 className=''>{props.question}</h3></div>
                </div>
                <div className="flip-card-back border rounded border-dark bg-light text-black d-flex flex-column align-items-center justify-content-center">
                    <div class="overflow-auto"><p className=''>{props.answer}</p></div>
                </div>
            </div>
        </div>

    )
};

export default Flashcard
