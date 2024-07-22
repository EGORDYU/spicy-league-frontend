import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [starcraftrank, setStarcraftrank] = useState('n/a');
    const [starcraftrace, setStarcraftrace] = useState('n/a');
    const [leaguerank, setLeaguerank] = useState('n/a');
    const [leaguerole, setLeaguerole] = useState('n/a');
    const [leaguesecondaryrole, setLeaguesecondaryrole] = useState('n/a');
    const [cs2elo, setCs2elo] = useState(0);
    const [profimage, setProfimage] = useState('https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleRegister = async (e) => {
        e.preventDefault();

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
                profimage
            });

            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration error:', error.response.data);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">Register</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Starcraft Rank</label>
                        <select
                            value={starcraftrank}
                            onChange={(e) => setStarcraftrank(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">Starcraft Race</label>
                        <select
                            value={starcraftrace}
                            onChange={(e) => setStarcraftrace(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="terran">Terran</option>
                            <option value="zerg">Zerg</option>
                            <option value="protoss">Protoss</option>
                            <option value="n/a">N/A</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">League Rank</label>
                        <select
                            value={leaguerank}
                            onChange={(e) => setLeaguerank(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">League Role</label>
                        <select
                            value={leaguerole}
                            onChange={(e) => setLeaguerole(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">League Secondary Role</label>
                        <select
                            value={leaguesecondaryrole}
                            onChange={(e) => setLeaguesecondaryrole(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">CS2 Elo</label>
                        <select
                            value={cs2elo}
                            onChange={(e) => setCs2elo(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            {[...Array(31).keys()].map(i => (
                                <option key={i} value={i * 1000}>{i * 1000}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image -- URL to your image -- </label>
                        <input
                            type="text"
                            value={profimage}
                            onChange={(e) => setProfimage(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
