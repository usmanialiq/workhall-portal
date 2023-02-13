import { React, useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import CustomImageUploader from "./avatar";

const ProfileSettings = ({ user }) => {
    const [data, setData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        image: "",
        email: "",
    });
    console.log("🚀 ~ file: Profile.jsx:6 ~ ProfileSettings ~ data", data)

    
    useEffect(() => {
        setData({ ...user });
    }, []);

    const handleFirstNameChange = (e) => {
        e.preventDefault();
        setData({ ...data, firstName: e.target.value });
    };

    const handleLastNameChange = (e) => {
        e.preventDefault();
        setData({ ...data, lastName: e.target.value });
    };
    
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const dataToSubmit = data;
        try {
            const { checkData } = await axios.put("users/account/" + user.id, dataToSubmit).then(res => {console.log(res);});
            if (checkData) {
                swal('Good Job!', 'User created updated', 'success');
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    };

    const getImageToUpload = (img) => {
        console.log(img);
    }

    return (
        <div className="container w-50">
            <div className="row mt-4 mb-4">
                <div className="col-4 d-flex">
                    <CustomImageUploader getImage={getImageToUpload} img={user.image ? user.image : ""} />
                </div>
                <div className="col-6 d-flex align-items-center">
                    <h4 className="text-center">{user.firstName + ' ' + user.lastName}</h4>
                </div>
                <div className="mt-2">
                    <small> Supported formats: JPEG, PNG or GIF <br />
                    Max size: 10 MB </small>
                </div>
            </div>
            <hr />
            <form onSubmit={handleSaveChanges}>
                <div className="form-group mb-4">
                    <label htmlFor="firstName">
                        First Name
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
                        readOnly
                        defaultValue={data.email}
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