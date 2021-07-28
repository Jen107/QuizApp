import React from 'react';
import { ProgressBar } from './progress';


export default function Overlay({ grade, questionNumber }) {
    return (
        <div id="overlay">
            <div className="overlay-item">
                <p className="overlay-prefix">Question {questionNumber}/10</p>
                <ProgressBar max={10} current={questionNumber} />
            </div>
            <div className="overlay-item">
                <p className="overlay-prefix">Grade</p>
                <h1 className="overlay-main-text">{grade}</h1>
            </div>
        </div>
    );
}