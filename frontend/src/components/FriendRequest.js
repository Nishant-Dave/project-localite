import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchFriendList();
    }
  }, [token]);


  useEffect(() => {

    if (token) {
      fetchFriendRequests();
    }
  }, [token]);


  const fetchFriendList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/friend-list/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFriends(response.data);
      console.log("friend list is updated")
    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };



  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/friend-requests/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      console.log("request id is: " + requestId)
      await axios.post(`http://127.0.0.1:8000/api/accept-request/${requestId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // After accepting the request,  the updated list of requests
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/reject-request/${requestId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // After rejecting the request, fetch the updated list of requests
      fetchFriendRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}  >
            {request.sender_name} sent you a friend request
            <button onClick={() => handleAcceptRequest(request.sender)}>Accept</button>
            <button onClick={() => handleRejectRequest(request.sender)}>Reject</button>

          </li>
        ))}
      </ul>

      <h2>Friend List</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>

    </div>
  );
};


