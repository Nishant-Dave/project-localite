import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FriendRequests from './FriendRequest'; 

export default function FriendList() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFriendRequests = async () => {
      // if (!token) {
      //   console.error('Token not found in localStorage.');
      //   return;
      // }

      try {

        const response = await axios.get("http://127.0.0.1:8000/api/friend-requests/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRequests(response.data);
        console.log("Friend requests fetched.");
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchFriendRequests();
  }, [token]);

  return (
    <div>
      <FriendRequests />
    </div>
  );
}
