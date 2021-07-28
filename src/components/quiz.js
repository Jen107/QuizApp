import React, { useState, useEffect, useCallback } from 'react';
import Question from './Questions/question';
import { loadQuestions } from './Questions/questionHelper';
import Overlay from './Interface/overlay';
import Answers from './Grades/answers';

export default function Quiz({ history }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [grade, setGrades] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        loadQuestions()
            .then(setQuestions)
            .catch(console.error);
    }, []);
    
    const gradeSaved = () => {
        history.push('/');
    };

    const changeQuestion = useCallback(
        (bonus = 0) => {
            if (questions.length === 0) {
                setDone(true);
                return setGrades(grade + bonus);
            }

            const randomQuestionIndex = Math.floor(
                Math.random() * questions.length
            );
            const currentQuestion = questions[randomQuestionIndex];
            const remainingQuestions = [...questions];
            remainingQuestions.splice(randomQuestionIndex, 1);

            setQuestions(remainingQuestions);
            setCurrentQuestion(currentQuestion);
            setLoading(false);
            setGrades(grade + bonus);
            setQuestionNumber(questionNumber + 1);
        },
        [
            grade,
            questionNumber,
            questions,
            setQuestions,
            setLoading,
            setCurrentQuestion,
            setQuestionNumber
        ]
    );

    useEffect(() => {
        if (!currentQuestion && questions.length) {
            changeQuestion();
        }
    }, [currentQuestion, questions, changeQuestion]);

    return (
        <>
            {loading && !done && <div id="loader" />}

            {!loading && !done && currentQuestion && (
                <div>
                    <Overlay grade={grade} questionNumber={questionNumber} />
                    <Question
                        question={currentQuestion}
                        changeQuestion={changeQuestion}
                    />
                </div>
            )}

            {done && <Answers grade={grade} gradeSaved={gradeSaved} />}
        </>
    );
}