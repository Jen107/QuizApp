import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthenticator } from './Auth/AuthContext';
import { Button } from 'react-bootstrap';
import Logo from './Interface/logo';

export default function Home() {
    const { currentUser, logout } = useAuthenticator()
    const [error, setError] = useState("")
    const history = useHistory()
  
    async function handleLogout() {
        setError("")
  
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    
    return (
        <>
        <h2>Welcome back {currentUser && currentUser.email} </h2>
            <Link to="/quiz" className="btn">
                Start Quiz
            </Link>
            <Link to="/grades" className="btn">
                View Grades
            </Link>
            <Link to="/create" className="btn">
                Create Quiz
            </Link>
            <Button variant="link" onClick={handleLogout}>
                Log Out
            </Button>
        </>
    );
}