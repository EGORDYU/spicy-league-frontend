import React, { useContext, useEffect } from 'react';
import AuthContext from '../AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log('User:', user);
    }, [user]);

    if (!user) {
        return <div>Loading...</div>; // Handle loading state or redirect to login
    }

    return (
        <div>
            <h1>Welcome {user.username}</h1>
            {/* Other content for the home page */}
        </div>
    );
};

export default Home;
