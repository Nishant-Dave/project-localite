import React from "react";


export default function Profile() {


    return (
        <div class="container bootstrap snippets bootdey">
            <h1 class="text-primary">Update Profile</h1>
            <form>

                <div class="row">


                    <div class="col-md-9 personal-info">

                        <div class="form-group">
                            <label class="col-lg-3 control-label">First name:</label>
                            <div class="col-lg-8">
                                <input class="form-control" type="text" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Last name:</label>
                            <div class="col-lg-8">
                                <input class="form-control" type="text" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">City:</label>
                            <div class="form-group col-lg-8">
                                <select class="form-control" id="selectCity">
                                    <option>Ahmedabad</option>
                                    <option>Mumbai</option>
                                    <option>Delhi</option>
                                    <option>Bangalore</option>
                                    <option>Hyderabad</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Email:</label>
                            <div class="col-lg-8">
                                <input class="form-control" type="text" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">About me:</label>
                            <div class="col-lg-8">
                                <textarea rows="4" cols="50" ></textarea>
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                                <button type="reset">Reset</button>
                            </div>

                        </div>

                    </div>

                </div>
            </form>


        </div>
    );
}