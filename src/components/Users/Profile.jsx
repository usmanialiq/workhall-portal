import { React, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import CustomImageUploader from "./avatar";
import { users } from '../../config/api-routes';

const ProfileSettings = ({ user }) => {
    const [payload, setPayload] = useState({ 
        firstName: user.firstName, 
        lastName: user.lastName, 
        image: user.image, 
        phone: user.phone,
        bio: user.bio,
    });

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${users}/${user._id}`, payload);
            if (data) {
                swal('Good Job!', 'User updated', 'success');
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    };

    return (
        <div className="container w-75">
            <div className="row mt-4">
                <div className="col-4">
                    <CustomImageUploader userId={user._id} img={user.image ? user.image : ""} />
                    <p className="pt-2">
                        <small>Supported formats: JPEG, PNG or GIF <br />
                        Max size: 10 MB</small>
                    </p>
                </div>
                <form className="col-8 m-auto" onSubmit={handleSaveChanges}>
                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="firstName"
                            placeholder="Enter first name"
                            required
                            defaultValue={user.firstName}
                            onChange={e => setPayload({ ...payload, firstName: e.target.value })}
                        />
                        <label htmlFor="firstName">
                            First Name
                        </label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control mt-2"
                            id="lastName"
                            placeholder="Enter Last Name"
                            required
                            defaultValue={user.lastName}
                            onChange={e => setPayload({ ...payload, lastName: e.target.value })}
                        />
                        <label htmlFor="lastName">
                            Last Name
                        </label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="email"
                            className="form-control mt-2"
                            id="email"
                            placeholder="Enter email"
                            readOnly
                            value={user.email}
                        />
                        <label htmlFor="email">
                            Email
                        </label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="phone"
                            className="form-control mt-2"
                            id="phoneNumber"
                            placeholder="Enter Phone Number"
                            required
                            defaultValue={user.phone}
                            onChange={e => setPayload({ ...payload, phone: e.target.value })}
                        />
                        <label htmlFor="phoneNumber">
                            Phone Number
                        </label>
                    </div>
                    <div className="form-floating mb-2">
                    <textarea
                        className='form-control mt-2 c-textarea'
                        id='bio'
                        defaultValue={user.bio}
                        required
                        placeholder='Set bio'
                        onChange={e => setPayload({...payload, bio: e.target.value})}
                    ></textarea>
                    <label htmlFor="bio">
                        Bio
                    </label>
                </div>
                    <button
                        type="submit"
                        className="btn btn-dark mt-3 col-12"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
};

export default ProfileSettings;