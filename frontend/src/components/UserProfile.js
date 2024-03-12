import React from "react";

export default function UserProfile( {userName, Email, city} ) {
    return (
        <>
            <div className="container mt-5">
    <div className="row">
       {/* Left Side: Profile Picture */}
      <div className="col-md-3">
        <img src="profile-pic.png" className="img-fluid rounded-circle" alt="profile-pic"/>
      </div>

      {/* Right Side: Basic User Details */}
      <div className="col-md-9">
        <h2> {userName} </h2>
        <p>Email: {Email} </p>
        <p>Location: {city} </p>
        <a href="friend-list">My Friends</a>
        
      </div>
    </div>

    {/*  Space for User's Posts  */}
    <div className="row mt-5">
      <div className="col">
        <h3>My Posts</h3>
        <div className="card">
          <div className="card-body">


            {/*  Post Content  */}
            <p>my posts here.</p>
          </div>
        </div>
        {/*  Additional posts here  */}
      </div>
    </div>
  </div>

        </>
    )
}