import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [loggedInUserName, setLoggedInUserName] = useState('');


  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchFriendList();
      // Fetch the logged-in user's name
      const name = localStorage.getItem('userName');
      setLoggedInUserName(name);
    }
  }, []);

  const fetchFriendList = async () => {
    try {

      const response = await axios.get("http://127.0.0.1:8000/api/friend-list/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFriends(response.data);
      // console.log("Friend list fetched.");
    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };


  return (
    <div>
      <h5 className='text-primary'>Friend List</h5>
      <ul>
        {friends.map(friend => (

          friend.sender_name !== loggedInUserName && (


            <li key={friend.id}>
              {friend.sender_name}
              
            </li>
          )
        ))}
      </ul>



    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import FriendRequests from './FriendRequest';

// export default function FriendList() {
//   const [requests, setRequests] = useState([]);
//   const [friends, setFriends] = useState([]);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (token) {
//       const fetchFriendList = async () => {
//         // if (!token) {
//         //   console.error('Token not found in localStorage.');
//         //   return;
//         // }

//         try {

//           const response = await axios.get("http://127.0.0.1:8000/api/friend-requests/", {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           setRequests(response.data);
//           console.log("Friend requests fetched.");
//         } catch (error) {
//           console.error('Error fetching friend requests:', error);
//         }
//       };
//       fetchFriendList();
//     }
//   }, []);


//   const handleChat = (friendId) => {
//     // Handle chat code here
//     console.log(`Chatting with friend ${friendId}`);
//   };



//   return (
//     <div>
//       <h4>Friend List</h4>
//       <ul>
//         {friends.map(friend => (
//           <li key={friend.id}>
//             {friend.sender_name}
//             <button onClick={() => handleChat(friend.id)}> message</button>
//           </li>
//         ))}
//       </ul>

//     </div>
//   );
// }
