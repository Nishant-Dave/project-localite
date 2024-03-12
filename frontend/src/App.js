import './App.css';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import UpdateProfile from './components/UpdateProfile';
import UserProfile from './components/UserProfile';
import FriendList from './components/FriendList';
import FriendRequests from './components/FriendRequest';

function App() {

    const [userName, setUserName] = useState('');
    const [email_id, setEmail_id] = useState('');
    // const [city, setCity] = useState('');
    // const [City, setCity] = useState('');

  
    useEffect(() => {
      const name = localStorage.getItem('userName');
      const email = localStorage.getItem('email_id');
      
      setUserName(name);
      setEmail_id(email)
    }, []);


  return (

    <Router>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Login />} /> 
            <Route exact path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/post" element={<Post userName={userName} />} /> 
            <Route path="/edit-profile" element={<UpdateProfile userName={userName} />} />             
            <Route path="/user-profile" element={<UserProfile userName={userName} Email={email_id} />} />  
            <Route exact path="friend-list" element={<FriendList />} />
            <Route exact path="friend-request" element={<FriendRequests/>} />


          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;






// import './App.css';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Register from './components/Register';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <Login />

//       </div>
//       <div className="container">
//         <Register />
//       </div>


//     </>
//   );
// }

// export default App;
