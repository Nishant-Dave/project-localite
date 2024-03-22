import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import FriendList from './FriendList';


export default function Chat({ currentUser, friendId }) {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem('token');
  // const loggedInUser = localStorage.getItem('userName');

  // alert(friendId)

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/send-message/', {
        recipient: friendId,
        content: content,
      },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

        });
      setContent('');
      fetchMessages();
      alert("Success..!")
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get-message/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h4> {friendId} </h4>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.sender}</strong>: {message.content}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};






// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Chat({ recipientId }) {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/get-message/');
//       setMessages(response.data.messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const sendMessage = async () => {
//     try {
//       await axios.post(
//         'http://127.0.0.1:8000/api/send-message/',
//         {
//           recipient: recipientId,
//           content: newMessage
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       setNewMessage('');
//       fetchMessages();
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const handleMessageChange = (event) => {
//     setNewMessage(event.target.value);
//   };

//   const renderConversation = () => {
//     const conversation = {};
//     messages.forEach((message) => {
//       if (!conversation[message.sender]) {
//         conversation[message.sender] = [];
//       }
//       conversation[message.sender].push(message);
//     });

//     return Object.keys(conversation).map((sender, index) => (
//       <div key={index} className="conversation">
//         <strong>{sender}</strong>:
//         {conversation[sender].map((message, index) => (
//           <div key={index} className="message">
//             {message.content}
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   return (
//     <div className="chat-container">
//       <div className="conversation-container">{renderConversation()}</div>
//       <div className="message-input">
//         <textarea
//           value={newMessage}
//           onChange={handleMessageChange}
//           placeholder="Type message..."
//           rows={3}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }




// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Chat({ recipientId }) {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const token = localStorage.getItem('token');


//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/get-message/');
//       setMessages(response.data.messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };


// const sendMessage = async () => {
//   try {
//     await axios.post('http://127.0.0.1:8000/api/send-message/', {
//       recipient: recipientId,
//       content: newMessage
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     setNewMessage('');
//     fetchMessages();
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// };


// const handleMessageChange = (event) => {
//   setNewMessage(event.target.value);
// };



// return (
//   <div className="chat-container">
//     <div className="messages">
//       {messages.map((message, index) => (
//         <div key={index} className="message">
//           <strong>{message.sender}</strong>: {message.content}
//         </div>
//       ))}
//     </div>
//     <div className="message-input">
//       <textarea
//         value={newMessage}
//         onChange={handleMessageChange}
//         placeholder="Type message..."
//         rows={3}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   </div>
// );
// };





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Chat = ({ friend }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         // Fetch chat messages with friend from backend
//         const response = await axios.get(`http://your-backend-api/chat/${friend.id}`);
//         setMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [friend]);

//   const sendMessage = async () => {
//     try {
//       // Send message to backend
//       await axios.post('http://your-backend-api/chat/send', {
//         recipientId: friend.id,
//         content: newMessage,
//       });
//       // Clear the input field
//       setNewMessage('');
//       // Refresh messages
//       // fetchMessages();
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Chat with {friend.username}</h2>
//       <ul>
//         {messages.map((message) => (
//           <li key={message.id}>{message.content}</li>
//         ))}
//       </ul>
//       <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;

