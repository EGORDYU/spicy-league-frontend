// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
import Pchamps from './components/Pchamps';
import Cseason from './components/Cseason';
import Players from './components/Players';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/pchamps" element={<Pchamps />} />
          <Route path="/cseason" element={<Cseason />} />
          <Route path="/players/*" element={<Players />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
