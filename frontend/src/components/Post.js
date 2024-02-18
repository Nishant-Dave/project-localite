import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Post() {


    const [content, setContent] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('userName');
        setUserName(name);
    }, []);


    const handlePost = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User is not authenticated');
            }

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


            console.log('Post successful:', response.data);
            setContent('');     // Post content is saved

        } catch (error) {
            console.error('Error posting to wall:', error);
        }
    };

    return (
        <div>

            <h1>Welcome, {userName} </h1>
            <h2>Type something below:</h2>
            <form>

                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something..."
                        rows="4"
                        cols="50"
                    ></textarea>
                    <br />
                    <div>
                        <button onClick={handlePost}>Post</button>
                        <button type="reset">Reset</button>
                    </div>
                </div>

            </form >
        </div>
    );
}

