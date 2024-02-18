import React from "react";
import LogoutButton from './Logout';

export default function Navbar() {

        return (


            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">localite</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/post">Post</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/profile">Profile</a>
                            </li>
                        

                        </ul>
                        <form className="d-flex">
                            <LogoutButton />
                            

                        </form>
                    </div>
                </div>
            </nav>
        )
    }
