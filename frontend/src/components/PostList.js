import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
    const [userPosts, setUserPosts] = useState([]);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.get(`http://127.0.0.1:8000/api/post-list/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                },
            });

            setUserPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    return (
        <div>
            <h2>My Posts</h2>
            <ul>
                {userPosts.map((post, index) => (
                    <li key={index}>{post.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function PostList () {
//     const [userPosts, setUserPosts] = useState([]);
//     const userId = localStorage.getItem('user_id'); 

//     useEffect(() => {
//         fetchUserPosts();
//     }, []);


//     const fetchUserPosts = async () => {
//         try {
//             console.log(userId)
//             const response = await axios.get(`http://127.0.0.1:8000/api/post-list/${userId}/`,
//             );
//             setUserPosts(response.data.posts); 
            

//         } catch (error) {
//             console.error('Error fetching user posts:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>User Posts</h2>
//             <ul>
//                 {userPosts.map((post, index) => (
//                     <li key={index}>{post.content}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

