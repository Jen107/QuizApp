import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../Firebase/FirebaseInit';
import { useAuthenticator } from '../Auth/AuthContext'


export default function SaveGrade({ grade, gradeSaved }) {
    const { currentUser } = useAuthenticator()
    const [username, setUsername] = useState('');
    const firebase = useFirebase();

    const onUsernameChange = (e) => {
        const updatedUsername = e.target.value;
        setUsername(updatedUsername);
    };

    const saveGrade = (e) => {
        e.preventDefault();
        const record = {
            name: username,
            grade
        };

        firebase.grades().push(record, () => {
            gradeSaved();
        });
    };

    return (
        <div className="container">
            <h1>Grade: {grade}%</h1>
            <form onSubmit={saveGrade}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your name"
                    value={username}
                    onChange={onUsernameChange}
                />
                <button type="submit" className="btn">
                    Save
                </button>
            </form>
            <Link to="/" className="btn">
                Go Home
            </Link>
        </div>
    );
}