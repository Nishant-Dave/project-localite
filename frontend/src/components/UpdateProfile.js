import React, { useState } from "react";
import axios from "axios";


export default function UpdateProfile({ userName }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const profileData = {
                first_name: firstName,
                last_name: lastName,
                city: city,
                bio: bio
            };

            const response = await axios.put(
                'http://127.0.0.1:8000/api/profile/', profileData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Profile updated successfully", response.data)
            localStorage.setItem('city', city);
            alert( city )
            // form reset and success msg logic here
        }
        catch (error) {
            console.log("Error updating profile: ", error)
        }
    };


    return (
        <div className="container bootstrap snippets bootdey">
            <h1 className="text-primary">Welcome, {userName}</h1>

            <h2 className="text-dark">Update your profile</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">


                    <div className="col-md-9 personal-info">

                        <div className="form-group">
                            <label className="col-lg-3 control-label">First name:</label>
                            <div className="col-lg-8">
                                <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Last name:</label>
                            <div className="col-lg-8">
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">City:</label>
                            <div className="form-group col-lg-8">
                                <select className="form-control" id="selectCity"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}>

                                    <option value="">Select City</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className="col-lg-3 control-label">About me:</label>
                            <div className="col-lg-8">
                                <textarea rows="4" cols="50"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)} ></textarea>
                            </div>
                            <div>
                                <button type="submit">Save changes</button>
                                <button type="reset">Reset</button>
                            </div>

                        </div>

                    </div>

                </div>
            </form>


        </div>
    );
}