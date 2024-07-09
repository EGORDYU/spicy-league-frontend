import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
import Pchamps from './components/Pchamps';
import Cseason from './components/Cseason';
import Players from './components/Players';
import Header from './components/Header';
import Login from './components/Login';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/info" element={<PrivateRoute><Info /></PrivateRoute>} />
                        <Route path="/pchamps" element={<PrivateRoute><Pchamps /></PrivateRoute>} />
                        <Route path="/cseason" element={<PrivateRoute><Cseason /></PrivateRoute>} />
                        <Route path="/players/*" element={<PrivateRoute><Players /></PrivateRoute>} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
