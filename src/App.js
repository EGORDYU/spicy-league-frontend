import {React, useEffect}  from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Pchamps from './components/Pchamps';
import Cseason from './components/Cseason';
import Players from './components/Players';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './AuthContext';
import Profile from './components/Profile';
import EventDetail from './components/EventDetail'; // Import the EventDetail component
import Announcements from './components/Announcements';
import Footer from './components/Footer';
import './App.css'; // Import the CSS file
import PasswordReset from './components/PasswordReset';
import refreshToken from './refreshToken';
import LobbyDetail from './components/LobbyDetail';
import CustomsList from './components/CustomsList';

function App() {



    return (
        <Router>
            <AuthProvider>
                <Header />
                <div className="App bg-gray-900 min-h-screen text-white" style={{ 
      backgroundImage: `url('/images/spicybackground.png')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center -100px',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/password-reset" element={<PasswordReset />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/profile/:userId" element={<Profile />} />
                        <Route path="/announcements" element={<Announcements />} />
                        <Route path="/pchamps" element={<Pchamps />} />
                        <Route path="/cseason" element={<Cseason />} />
                        <Route path="/players/*" element={<Players />} />
                        <Route path="/events/:id" element={<EventDetail />} />
                        <Route path="/customs" element={<CustomsList />} />
                        <Route path="/customs/:id" element={<LobbyDetail />} />
                    </Routes>
                </div>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
