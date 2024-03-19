import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchFriendRequests();
    }
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/friend-requests/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      setError('Error fetching friend requests. Please try again later.');
    }
  };



  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/accept-request/${requestId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Friend request accepted successfully.");
      alert("Friend request : Accepted")
      fetchFriendRequests();

      const updatedRequests = await fetchFriendRequests();
      console.log("Updated friend requests:", updatedRequests);

      // Remove the accepted request from the list
      // setRequests(requests.filter(request => request.sender !== requestId));
    } catch (error) {
      console.error('Error accepting friend request:', error);
      setError('Error accepting friend request. Please try again later.');
    }
  };
  

  
  const handleRejectRequest = async (requestId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/reject-request/${requestId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Friend request rejected successfully.");
      alert("Friend request : Rejected")
      fetchFriendRequests();

      // Update UI by removing the rejected request
      // setRequests(requests.filter(request => request.sender !== requestId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      setError('Error rejecting friend request. Please try again later.');
    }
  };



  return (
    <div>
      <h5 className='text-primary'>Friend Requests</h5>
      {error && <p className="error">{error}</p>}
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            {request.sender_name}
            <button onClick={() => handleAcceptRequest(request.sender)}>Accept</button>
            <button onClick={() => handleRejectRequest(request.sender)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};





// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// export default function FriendRequests() {
//   const [requests, setRequests] = useState([]);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (token) {
//       fetchFriendRequests();
//     }
//   }, []);

//   const fetchFriendRequests = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/friend-requests/', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setRequests(response.data);

      
//     } catch (error) {
//       console.error('Error fetching friend requests:', error);
//     }
//   };

//   const handleAcceptRequest = async (requestId) => {
//     try {
//       console.log(requestId)
//       await axios.post(`http://127.0.0.1:8000/api/accept-request/${requestId}/`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("Friend request accepted successfully.");
//       // updated friend requests
//       const updatedRequests = await fetchFriendRequests();
//       console.log("Updated friend requests:", updatedRequests);
      
//     } catch (error) {
//       console.error('Error accepting friend request:', error);
      
//     }
//   };
  
//   const handleRejectRequest = async (requestId) => {
//     try {
//       await axios.post(`http://127.0.0.1:8000/api/reject-request/${requestId}/`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("Friend request rejected successfully.");
//       //  updated friend requests
//       const updatedRequests = await fetchFriendRequests();
//       console.log("Updated friend requests:", updatedRequests);
//     } catch (error) {
//       console.error('Error rejecting friend request:', error);
//     }
//   };
//   return (
//     <div>
//       <h5 className='text-primary'>Friend Requests</h5>
//       <ul>
//         {requests.map(request => (
//           <li key={request.id}>
//             {request.sender_name}
//             <button onClick={() => {
//               console.log("requestID is: " + request.id);
//               handleAcceptRequest(request.id)}}>Accept</button>
//             <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

