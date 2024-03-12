import axios from "axios";
import React, { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email_id, setEmail_id] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                name,
                email_id,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert(name + ' is registered.')
            console.log('User registered successfully:', response.data);
        } catch (error) {

            console.error('Error registering user:', error.message);
        }
    };

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputUserName">Full name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputUsername"
                        placeholder="Enter user name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
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
                <button type="submit" className="btn btn-primary" onClick={handleRegister}>
                    Register
                </button>
                <p><a className="link-opacity-100-hover" href="/login">Login</a></p>
            </form>
        </>
    );
}


// import React from "react";

// export default function register() {
//     return (
//         <>
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="exampleInputUserName">User name</label>
//                     <input type="text" className="form-control" id="exampleUsername" placeholder="Enter user name" />
                    
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="exampleInputEmail1">Email address</label>
//                     <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />

//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="exampleInputPassword1">Password</label>
//                     <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
//                 </div>
//                 <div className="form-group form-check">
//                 </div>
//                 <button type="submit" className="btn btn-primary" onClick={handleRegisterEvent}>Register</button>
//                 <p><a className="link-opacity-100-hover" href="/login">Login</a></p>

//             </form>
//         </>
//     )
// }