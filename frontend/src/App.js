import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Post from './components/Post';
import UpdateProfile from './components/UpdateProfile';
import UserProfile from './components/UserProfile';
import FriendList from './components/FriendList';
import FriendRequests from './components/FriendRequest';
import Chat from './components/Chat';

function App() {
  const [userName, setUserName] = useState('');
  const [email_id, setEmail_id] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('email_id');
    const token = localStorage.getItem('token');

    if (name && email && token) {
      setUserName(name);
      setEmail_id(email);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={
                isAuthenticated ? <Navigate to="/home" /> : <Login />
              }
            />

            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/home" /> : <Login />
              }
            />

            <Route path="/register" element={<Register />} />

            <Route path="/home" element={
                isAuthenticated ? (<Home userName={userName} />) : (<Navigate to="/login" />)
              }
            />

            <Route path="/post" element={
                isAuthenticated ? (<Post userName={userName} />) : (<Navigate to="/login" />)
              }
            />

            <Route path="/edit-profile" element={
                isAuthenticated ? (<UpdateProfile userName={userName} Email={email_id} />) : (<Navigate to="/login" />)
              }
            />

            <Route path="/user-profile" element={
                isAuthenticated ? (<UserProfile userName={userName} Email={email_id} />) : (<Navigate to="/login" />)
              }
            />

            <Route path="friend-list" element={
                isAuthenticated ? (<FriendList />) : (<Navigate to="/login" />)
              }
            />

            <Route path="friend-request" element={
                isAuthenticated ? (<FriendRequests />) : (<Navigate to="/login" />)
              }
            />

            <Route path="chat" element={
                isAuthenticated ? (<Chat />) : (<Navigate to="/login" />)
              }
            />

          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;


