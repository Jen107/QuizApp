import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuthenticator } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuthenticator()
    const [error, setError] = useState("")
    const [working, setWorking] = useState(false)
    const history = useHistory()

    async function clickSubmit(e){
        e.preventDefault()

        try {
            setError("")
            setWorking(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Could not log in.')
        }

        setWorking(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>} 
                    <Form onSubmit={clickSubmit}>
                        <Form.Group id="email">
                            <Form.Control type="email" ref={emailRef} placeholder="Enter Email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={working} className="w-100" type="submit">Log In</Button> 
                    </Form>
                </Card.Body>
            </Card>
            <div className="loginInstead">
                <h4>Don't have an account? <br /><Link to="/signup">Sign up instead!</Link></h4>
            </div>
        </>
    )
}