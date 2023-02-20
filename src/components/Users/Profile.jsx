import { React } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import CustomImageUploader from "./avatar";
import { users } from '../../config/api-routes';

const ProfileSettings = ({ user }) => {
    let dataToSubmit = { firstName: user.firstName, lastName: user.lastName, image: user.image, phone: user.phone };

    const handleFirstNameChange = (e) => {
        e.preventDefault();
        dataToSubmit.firstName = e.target.value;
    };

    const handleLastNameChange = (e) => {
        e.preventDefault();
        dataToSubmit.lastName = e.target.value;
    };

    const handlePhoneNumberChange = e => {
        e.preventDefault();
        dataToSubmit.phone = e.target.value;
    }

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${users}/${user._id}`, dataToSubmit);
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
                            defaultValue={user.firstName}
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
                            defaultValue={user.lastName}
                            onChange={handleLastNameChange}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control mt-2"
                            id="email"
                            placeholder="Enter email"
                            readOnly
                            value={user.email}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            type="phone"
                            className="form-control mt-2"
                            id="phoneNumber"
                            placeholder="Enter Phone Number"
                            required
                            defaultValue={user.phone}
                            onChange={handlePhoneNumberChange}
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
        </div>
    )
};

export default ProfileSettings;