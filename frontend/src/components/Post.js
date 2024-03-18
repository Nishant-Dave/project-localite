import React, { useState } from 'react';
import PostList from './PostList';
import axios from 'axios';

export default function Post({ userName }) {
    const [content, setContent] = useState('');
    // const [comment, setComment] = useState('');

    const handlePost = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User is not authenticated');
            }

            // const postId = localStorage.getItem('post_id')
            const response = await axios.post(
                'http://127.0.0.1:8000/api/post/',
                { content },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Post successful")
            console.log('Post successful:', response.data);
            setContent(''); // Clear the post content after posting
            
        } catch (error) {
            console.error('Error posting to wall:', error);
        }
    };

    // const handleComment = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             throw new Error('User is not authenticated');
    //         }

    //         const response = await axios.post(
    //             'http://127.0.0.1:8000/api/add-comment/',
    //             { comment_text: comment },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         console.log('Comment posted:', response.data);
    //         setComment(''); // Clear the comment text after posting
    //     } catch (error) {
    //         console.error('Error posting comment:', error);
    //     }
    // };

    return (
        <div>
            <h3>Welcome, {userName}</h3>
            <h4>Type something below:</h4>
            <form>
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something..."
                        rows="3"
                        cols="60"
                    ></textarea>
                    <br />
                    <div>
                        <button onClick={handlePost}>Post</button>
                        <button type="reset">Reset</button>
                    </div>
                </div>
            </form>

            <PostList />

            {/* <form method="post" onSubmit={handleComment}>
                <div>
                    <label>{userName}</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                </div>
                <button type="submit">Comment</button>
            </form> */}
        </div>
    );
}




// import React, { useState } from 'react';
// import axios from 'axios';


// export default function Post({userName}) {


//     const [content, setContent] = useState('');


//     const handlePost = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('User is not authenticated');
//             }

//             const response = await axios.post(
//                 'http://127.0.0.1:8000/api/post/',
//                 { content },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );


//             console.log('Post successful:', response.data);
//             setContent('');     // Post content is saved

//         } catch (error) {
//             console.error('Error posting to wall:', error);
//         }
//     };

//     return (
//         <div>

//             <h1>Welcome, {userName} </h1>
//             <h2>Type something below:</h2>
//             <form>

//                 <div>
//                     <textarea
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         placeholder="Write something..."
//                         rows="4"
//                         cols="50"
//                     ></textarea>


//                     <br />
//                     <div>
//                         <button onClick={handlePost}>Post</button>
//                         <button type="reset">Reset</button>
//                     </div>
//                 </div>

//             </form >
//         </div>
//     );
// }



// import React, { useState } from 'react';
// import axios from 'axios';

// export default function Post({ userName }) {
//     const [content, setContent] = useState('');
//     // const [comment, setComment] = useState('');

//     const handlePost = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('User is not authenticated');
//             }

//             // const postId = localStorage.getItem('post_id')
//             const response = await axios.post(
//                 'http://127.0.0.1:8000/api/post/',
//                 { content },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             alert("Post successful")
//             console.log('Post successful:', response.data);
//             setContent(''); // Clear the post content after posting

//         } catch (error) {
//             console.error('Error posting to wall:', error);
//         }
//     };



//     return (
//         <div>
//             <h3>Welcome, {userName}</h3>
//             <h4>Type something below:</h4>
//             <form>
//                 <div>
//                     <textarea
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         placeholder="Write something..."
//                         rows="3"
//                         cols="60"
//                     ></textarea>
//                     <br />
//                     <div>
//                         <button onClick={handlePost}>Post</button>
//                         <button type="reset">Reset</button>
//                     </div>
//                 </div>
//             </form>


//         </div>
//     );
// }




// import React, { useState } from 'react';
// import axios from 'axios';


// export default function Post({userName}) {


//     const [content, setContent] = useState('');


//     const handlePost = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('User is not authenticated');
//             }

//             const response = await axios.post(
//                 'http://127.0.0.1:8000/api/post/',
//                 { content },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );


//             console.log('Post successful:', response.data);
//             setContent('');     // Post content is saved

//         } catch (error) {
//             console.error('Error posting to wall:', error);
//         }
//     };

//     return (
//         <div>

//             <h1>Welcome, {userName} </h1>
//             <h2>Type something below:</h2>
//             <form>

//                 <div>
//                     <textarea
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         placeholder="Write something..."
//                         rows="4"
//                         cols="50"
//                     ></textarea>


//                     <br />
//                     <div>
//                         <button onClick={handlePost}>Post</button>
//                         <button type="reset">Reset</button>
//                     </div>
//                 </div>

//             </form >
//         </div>
//     );
// }
