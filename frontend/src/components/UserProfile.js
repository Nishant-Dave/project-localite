import React from "react";

export default function UserProfile({ userName, Email, city, posts }) {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* Left Side: Profile Picture */}
          <div className="col-md-3">
            <img
              src="profile-pic.png"
              className="img-fluid rounded-circle"
              alt="profile-pic"
            />
          </div>

          {/* Right Side: Basic User Details */}
          <div className="col-md-9">
            <h2>{userName}</h2>
            <p>Email: {Email}</p>
            <p>Location: {city}</p>
            <a href="friend-list">My Friends</a>
          </div>
        </div>

        {/* Space for User's Posts */}
        <div className="row mt-5">
          <div className="col">
            <h3>All Posts</h3>
            {/* Check if posts array is defined before mapping through it */}
            {posts?.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="card mb-3">
                  <div className="card-body">
                    {/* Post Content */}
                    <p>{post.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
