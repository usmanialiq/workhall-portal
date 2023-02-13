import { React, useState } from "react";
import CustomImageUploader from "./avatar";

const ProfileSettings = ({ user }) => {
    const [data, setData] = useState(user);
    console.log("🚀 ~ file: Profile.jsx:6 ~ ProfileSettings ~ data", data)
    
    const handleSaveChanges = (e) => {
        e.preventDefault();
    };

    const handleFirstNameChange = (e) => {
        // setData({ ...data, name: e.target.value });
    };

    const handleLastNameChange = (e) => {
        // setData({ ...data, name: e.target.value });
    };
    
    const handleEmailChange = (e) => {
        // setData({ ...data, email: e.target.value });
    };

    const getImageToUpload = (img) => {
        console.log(img);
    }

    return (
        <div className="container w-50">
            <div className="row">
                <div className="col-2 d-flex justify-content-center">
                    <CustomImageUploader getImage={getImageToUpload} img={data.image ? data.image : ""} />
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <h4 className="text-center">{data.firstName + ' ' + data.lastName}</h4>
                </div>
            </div>
            <form onSubmit={handleSaveChanges}>
                <div className="form-group mb-4">
                    <label htmlFor="firstName">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control mt-2"
                        id="firstName"
                        placeholder="Enter first name"
                        required
                        defaultValue={data.firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control mt-2"
                        id="lastName"
                        placeholder="Enter Last Name"
                        required
                        defaultValue={data.lastName}
                        onChange={handleLastNameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control mt-2"
                        id="email"
                        placeholder="Enter email"
                        required
                        defaultValue={data.email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-dark mt-3 col-12"
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
};

export default ProfileSettings;