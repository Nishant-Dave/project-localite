import React, { useState } from "react";
import axios from 'axios';
import LogoutButton from './Logout';
import Home from "./Home";

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const token = localStorage.getItem('token');


    const handleSearchChange = async (event) => {
        const { value } = event.target;

        setSearchQuery(value);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search?query=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            setSearchResults(response.data);

        } catch (error) {
            console.error(error);

        }
    };

    const sendFriendRequest = async (userId) => {
        try {
            console.log("userID is: " + userId);
            // Send friend request with authentication token
            await axios.post(`http://127.0.0.1:8000/api/send-request/${userId}/`, {}, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authentication token
                    Authorization: `Bearer ${token}`,

                },
            });
            alert('Friend request sent');
        } catch (error) {
            console.error(error);
            alert('Failed to send friend request');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="Home">localite</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/register">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/post">Post</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/edit-profile">Edit profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/user-profile">My Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/chat">Chat</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search friend" aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
                        </form>
                        {searchResults.length > 0 && (
                            <ul className="list-group">
                                {searchResults.map((result) => (
                                    <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {result.name}
                                        <button className="btn btn-primary" onClick={() => sendFriendRequest(result.id)}>Send Request</button>
                                        {console.log("result.id is: " + result.id)}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}
