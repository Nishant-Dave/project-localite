import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get_message/');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/send_message/', {
        recipient: recipientId,
        content: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}</strong>: {message.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <textarea
          value={newMessage}
          onChange={handleMessageChange}
          placeholder="Type message..."
          rows={3}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;



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

