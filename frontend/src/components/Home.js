import React from "react"
import Post from "./Post"
import LogoutButton from "./Logout"
import FriendList from "./FriendList"
import FriendRequests from "./FriendRequest"
import Chat from "./Chat"


export default function Home({ userName }) {



    return (

        <div>
            {/* ------------------------- HEADER ----------------------- */}
            <div className="container" style={{ position: "fixed" }}>
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <svg className="bi me-2" width="40" height="32"></svg>
                        <span className="fs-1 fw-bold text-primary" >localite</span>
                    </a>

                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="home" className="nav-link active" aria-current="page">Home</a></li>
                        <li className="nav-item"><a href="chat" className="nav-link">Chat</a></li>
                        <li className="nav-item"><a href="/" className="nav-link">Pricing</a></li>
                        <li className="nav-item"><a href="/" className="nav-link">FAQs</a></li>


                        <a href="/" className="nav-link" ><LogoutButton /></a>
                    </ul>
                </header>
            </div>

            {/* -------------------------- SIDEBAR ------------------------ */}


            <div className="container" style={{ paddingTop: "90px" }}>
                <div className="row">
                    <div className="col-3">
                        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "300px", height: "80%", position: "fixed" }}>
                            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                                <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
                                <span className="fs-4" href="user-profile"> {userName} </span>
                            </a>
                            <hr />
                            <ul className="nav nav-pills flex-column mb-auto">
                                <li className="nav-item">
                                    <a href="/" className="nav-link active" aria-current="page">
                                        <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home" /></svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="nav-link link-dark" >
                                        <FriendRequests />
                                        <FriendList />

                                        <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>

                                    </a>
                                </li>

                            </ul>
                            <hr />
                            <div className="dropdown">
                                <a href="/" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                                    <strong>{userName}</strong>
                                </a>
                                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                    <li><a className="dropdown-item" href="/">New project...</a></li>
                                    <li><a className="dropdown-item" href="/">Settings</a></li>
                                    <li><a className="dropdown-item" href="user-profile">Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/"> <LogoutButton /> </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/* -------------------------------- MAIN CONTENT -------------------------------- */}


                    <div className="col-6" style={{ paddingTop: "50px" }}>
                        <div>
                            <Post />


                        </div>
                    </div>
                    <div className="col-3 bg-light">
                        <h3 className="text-primary">Chat box</h3>
                        <Chat />

                    </div>

                </div>
            </div>


        </div>
    )
}