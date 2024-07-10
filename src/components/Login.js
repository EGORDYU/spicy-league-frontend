import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginUser(username, password);
            navigate('/');  // Redirect to the home page or any other page
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid login credentials');
        }
    };

    return (
        <div>
            <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
        </div>
    );
};

export default Login;
