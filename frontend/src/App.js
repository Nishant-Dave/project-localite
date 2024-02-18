import './App.css';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
// import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import Profile from './components/Profile';


function App() {
  return (
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Login />} /> 
            <Route exact path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/post" element={<Post />} /> 
            <Route path="/profile" element={<Profile />} />             
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
