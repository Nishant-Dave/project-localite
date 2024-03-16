import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [email_id, setEmail_id] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                email_id,
                password
            });

            if (response.status === 200) {
                
                const { name, tokens } = response.data;
                localStorage.setItem('userName', name); // Store the user's name in local storage
                localStorage.setItem('email_id', email_id)
                localStorage.setItem('token', tokens.access);
                alert(name + " is logged in.")

                // navigate('/Home');
                window.location.href = '/home'; 


              } else {
                console.error('Invalid credentials');
                
              }
        

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email_id}
                    onChange={(e) => setEmail_id(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>


            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">remember me</label>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>Log in</button>
            <p><a className="link-opacity-100-hover" href="/">Forgot password?</a></p>
            <p><Link className="link-opacity-100-hover" to="/register">Register</Link></p>
        </form>
    );
}



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function LoginForm() {
//     const [email_id, setEmail_id] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (event) => {
//         event.preventDefault(); 
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/login/', {
//                 email_id,
//                 password
//             });
//             const token = response.data.token;
//             localStorage.setItem('token', token);

//         } catch (error) {
//             console.error('Login error:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <div className="form-group">
//                 <label htmlFor="exampleInputEmail1">Email address</label>
//                 <input
//                     type="email"
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                     placeholder="Enter email"
//                     value={email_id}
//                     onChange={(e) => setEmail_id(e.target.value)}
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="exampleInputPassword1">Password</label>
//                 <input
//                     type="password"
//                     className="form-control"
//                     id="exampleInputPassword1"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>


//             <div className="form-group form-check">
//                 <input type="checkbox" className="form-check-input" id="exampleCheck1" />
//                 <label className="form-check-label" htmlFor="exampleCheck1">remember me</label>
//             </div>
//             <button type="submit" className="btn btn-primary">Log in</button>
//             <p><a className="link-opacity-100-hover" href="/">Forgot password?</a></p>
//             <p><Link className="link-opacity-100-hover" to="/register">Register</Link></p>
//         </form>
//     );
// }

