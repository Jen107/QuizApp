import { render } from '@testing-library/react';
import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFirebase } from '../Firebase/FirebaseInit';
import firebase from 'firebase';



export class CreateQuestionForm extends Component {
    //submitTestFunction = firebase.functions().httpCallable('submitTest');
    testName = "";
    question = "";
    incorrectA = "";
    incorrectB = "";
    incorrectC = "";
    correctAnswer = "";
    testID = Math.random();

    state = {
        testData: {
            testName: "",
            questionData: []
        }
    };

    onFormStarted = (e) => {   
        e.preventDefault()
        console.log(this.testName);
        this.setState(({ testData: { name , testID, questionData } }) => (
            {
                testData: {
                    testName: this.testName,
                    testID: this.testID,
                    questionData: []
                }
            }
        ));
        e.preventDefault()
    }

    onQuestionCreated = (e) => {
        e.preventDefault()
        var data = {
            question: this.question,
            correctAnswer: this.correctAnswer,
            incorrectAnswers: [this.incorrectA, this.incorrectB, this.incorrectC]
        };

        var existingQuestionData = this.state.testData.questionData;
        existingQuestionData.push(data);

        this.setState((currentState, props) => (
            {
                testData: {
                    testName: currentState.testData.testName,
                    questionData: existingQuestionData
                }
            }
        ));
        console.log(this.state.testData)
    }

    onTestFinished = (e) => {
        e.preventDefault()
        const firebaseRef = firebase.database().ref('tests');

        const testEntry = {
            testData: this.state.testData
        }

        firebaseRef.push(testEntry);

    }

    render() {
        console.log("Render()")
        console.log(this.state.testData)
        if (this.state.testData.testName === "") {
            return(

                <Form>
                    <Form.Group id="testName">
                            <Form.Control type="testName" onChange={(event) => {this.testName = event.target.value }} placeholder="Enter Test Name" /><br/>
                            <Button className="w-50" type="submit" onClick={this.onFormStarted}>
                                Start Quiz!
                            </Button>
                    </Form.Group>
                </Form>
            );
        }
//remainder of form is built here//
        return (
                <div className="testForm" id="testForm">
                    <Form>
                        <Form.Group id="createTestQuestion">
                            <Form.Control as="textarea" onChange={(event) => {this.question = event.target.value}} placeholder="Enter the Question" />
                        </Form.Group>

                        <Form.Group id="correctAnswer">
                            <Form.Control type="correctAnswer" onChange={(event) => {this.correctAnswer = event.target.value}} ref={this.correctAnswer} placeholder="Enter correct answer" />
                        </Form.Group>

                        <Form.Group id="incorrectAnswerA">
                            <Form.Control type="incorrectAnswerA" onChange={(event) => {this.incorrectA = event.target.value}} placeholder="Enter incorrect option A" />
                        </Form.Group>

                        <Form.Group id="incorrectAnswerB">
                            <Form.Control type="incorrectAnswerB" onChange={(event) => {this.incorrectB = event.target.value}} placeholder="Enter incorrect option B"  />
                        </Form.Group>

                        <Form.Group id="incorrectAnswerC">
                            <Form.Control type="incorrectAnswerC" onChange={(event) => {this.incorrectC = event.target.value}} placeholder="Enter incorrect option C"  />
                        </Form.Group>

                        <Button className="w-50" type="submit" onClick={this.onQuestionCreated}>
                            Add another question
                        </Button>

                        <Button className="w-50" type="submit" onClick={this.onTestFinished}>
                            Finish adding questions
                        </Button>
                    </Form>
                </div>
        )
        }
    }

export default CreateQuestionForm