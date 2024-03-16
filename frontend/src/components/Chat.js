import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ friend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch chat messages with friend from backend
        const response = await axios.get(`http://your-backend-api/chat/${friend.id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [friend]);

  const sendMessage = async () => {
    try {
      // Send message to backend
      await axios.post('http://your-backend-api/chat/send', {
        recipientId: friend.id,
        content: newMessage,
      });
      // Clear the input field
      setNewMessage('');
      // Refresh messages
      // fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat with {friend.username}</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
      <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;




// import React, { useState, useEffect } from 'react';
// import WebSocket from 'react-websocket';

// export default function Chat ()  {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const handleData = (data) => {
//     const message = JSON.parse(data);
//     setMessages([...messages, message]);
//   };

//   const handleSendMessage = () => {
//     // Send the message to the server
//     // You can use a library like axios or the native WebSocket API
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg.message}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={inputMessage}
//         onChange={(e) => setInputMessage(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send Message</button>

//       <WebSocket
//         url="ws://your-backend-url/ws/some_path/"
//         onMessage={handleData}
//       />
//     </div>
//   );
// };

