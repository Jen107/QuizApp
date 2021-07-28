import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuthenticator } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signup } = useAuthenticator()
    const [error, setError] = useState("")
    const [working, setWorking] = useState(false)
    const history = useHistory()
    const [checked, setChecked] = React.useState(false);


    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    async function clickSubmit(e){
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfRef.current.value){
            return setError('Oops! Passwords did not match')
        }
        try {
            setError("")
            setWorking(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Could not create account.')
        }

        setWorking(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="checkbox" id="checkbox">
                    <Form onSubmit={clickSubmit}>
                        <Form.Group id="email">
                            <Form.Control type="email" ref={emailRef} placeholder="Enter Email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Control type="password" placeholder="Confirm Password" ref={passwordConfRef} required />
                        </Form.Group>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox color="primary" />}
                            label="Set as Teacher Account"
                            labelPlacement="end"
                            classes="checkbox"
                        />
                        <Button disabled={working} className="w-100" type="submit">
                            Sign Up
                        </Button> 
                        <div className="login-switch">
                            <h4>Already have an account?<br></br> <Link to="/login">Log in instead!</Link></h4>
                        </div>
                    </Form>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}