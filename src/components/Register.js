import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';  // Import zxcvbn for password strength checking
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);  // New state for password strength
    const [starcraftrank, setStarcraftrank] = useState('n/a');
    const [starcraftrace, setStarcraftrace] = useState('n/a');
    const [leaguerank, setLeaguerank] = useState('n/a');
    const [leaguerole, setLeaguerole] = useState('n/a');
    const [leaguesecondaryrole, setLeaguesecondaryrole] = useState('n/a');
    const [cs2elo, setCs2elo] = useState(0);
    const [profimage, setProfimage] = useState('https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg');
    const [doodadlevel, setDoodadlevel] = useState('new'); // New state for doodadlevel
    const [error, setError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        // Evaluate password strength
        const evaluation = zxcvbn(passwordValue);
        setPasswordStrength(evaluation.score);  // Set password strength score (0-4)
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;  // Stop form submission
        }
    
        // Check password strength before submitting the form
        if (passwordStrength < 2) {  // Assuming 2 is the minimum acceptable strength
            setError('Password is too weak. Please choose a stronger password.');
            return;  // Stop form submission
        }
    
        try {
            const response = await axiosInstance.post(`${apiUrl}register/`, {
                username,
                email,
                password,
                starcraftrank,
                starcraftrace,
                leaguerank,
                leaguerole,
                leaguesecondaryrole,
                cs2elo,
                profimage,
                doodadlevel, 
            });
    
            alert('Registration successful! Please check your email to verify your account.');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            setError('Registration failed. Please try again.');
        }
    };
    

    const getPasswordStrengthLabel = () => {
        switch (passwordStrength) {
            case 0:
                return 'Very Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-gray-700 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Register</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}  // Use handlePasswordChange
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500" 
                        />
                        <div className="mt-2">
                            <div className="text-white">Strength: {getPasswordStrengthLabel()}</div>
                            <div className="w-full bg-gray-500 rounded-full h-2">
                                <div className={`h-2 rounded-full ${
                                    passwordStrength >= 4
                                        ? 'bg-green-500'
                                        : passwordStrength >= 3
                                        ? 'bg-yellow-500'
                                        : passwordStrength >= 2
                                        ? 'bg-orange-500'
                                        : 'bg-red-500'
                                    }`}
                                    style={{ width: `${(passwordStrength + 1) * 20}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
    <label className="block text-sm font-bold mb-2 text-white">Confirm Password</label>
    <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
    />
</div>

                    {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
                    {/* Other form fields */}
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">Starcraft Rank</label>
                        <select
                            value={starcraftrank}
                            onChange={(e) => setStarcraftrank(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        >
                            <option value="bronze">Bronze</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                            <option value="platinum">Platinum</option>
                            <option value="diamond">Diamond</option>
                            <option value="master">Master</option>
                            <option value="grandmaster">Grandmaster</option>
                            <option value="n/a">N/A</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">Starcraft Race</label>
                        <select
                            value={starcraftrace}
                            onChange={(e) => setStarcraftrace(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        >
                            <option value="terran">Terran</option>
                            <option value="zerg">Zerg</option>
                            <option value="protoss">Protoss</option>
                            <option value="n/a">N/A</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">League Rank</label>
                        <select
                            value={leaguerank}
                            onChange={(e) => setLeaguerank(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        >
                            <option value="iron">Iron</option>
                            <option value="bronze">Bronze</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                            <option value="platinum">Platinum</option>
                            <option value="emerald">Emerald</option>
                            <option value="diamond">Diamond</option>
                            <option value="master">Master</option>
                            <option value="grandmaster">Grandmaster</option>
                            <option value="challenger">Challenger</option>
                            <option value="n/a">N/A</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">League Role</label>
                        <select
                            value={leaguerole}
                            onChange={(e) => setLeaguerole(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        >
                            <option value="top">Top</option>
                            <option value="jungle">Jungle</option>
                            <option value="mid">Mid</option>
                            <option value="adc">ADC</option>
                            <option value="support">Support</option>
                            <option value="fill">Fill</option>
                            <option value="n/a">N/A</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">League Secondary Role</label>
                        <select
                            value={leaguesecondaryrole}
                            onChange={(e) => setLeaguesecondaryrole(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        >
                            <option value="top">Top</option>
                            <option value="jungle">Jungle</option>
                            <option value="mid">Mid</option>
                            <option value="adc">ADC</option>
                            <option value="support">Support</option>
                            <option value="fill">Fill</option>
                            <option value="n/a">N/A</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">CS2 Elo</label>
                        <select
                            value={cs2elo}
                            onChange={(e) => setCs2elo(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        >
                            {[...Array(31).keys()].map(i => (
                                <option key={i} value={i * 1000}>{i * 1000}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">Doodad Hunter Level</label>
                        <select
                            value={doodadlevel}
                            onChange={(e) => setDoodadlevel(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        >
                            <option value="new">New</option>
                            <option value="experienced">Experienced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white">Profile Image URL</label>
                        <input
                            type="text"
                            value={profimage}
                            onChange={(e) => setProfimage(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                    {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Register;
