import React, { useState } from 'react';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch(`${apiUrl}accounts/password_reset/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Password reset email sent successfully. Please check your inbox.');
            } else if (response.status === 400) {
                setMessage('Invalid email address. Please try again.');
            } else {
                setMessage('Failed to send password reset email. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-gray-700 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Reset Password</h1>
                <form onSubmit={handlePasswordReset}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-white">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-gray-500"
                            required
                            placeholder="Enter your email address"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    {message && <div className="mt-4 text-center text-white">{message}</div>}
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;
