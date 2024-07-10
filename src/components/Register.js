import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                username,
                email,
                password,
            });

            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration error:', error.response.data);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Register</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
        </div>
    );
};

export default Register;
