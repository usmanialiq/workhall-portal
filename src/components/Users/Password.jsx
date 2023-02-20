import { React } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { users } from '../../config/api-routes';

const ChangePassword = ({ user }) => {
    let temp = {oldPassword: "", newPassword: "", confirmPassword: ""};

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${users}/change-password/${user._id}`, temp);
            if (data) {
                swal('Good Job!', 'Password updated', 'success');
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    };

    const handleCurrentPassword = (e) => {
        e.preventDefault();
        temp.oldPassword = e.target.value;
    };

    const handleNewPassword = (e) => {
        e.preventDefault();
        temp.newPassword = e.target.value;
    };

    const handleConfirmPassword = (e) => {
        e.preventDefault();
        temp.confirmPassword = e.target.value;
    };

    return (
        <div className="container w-50 mt-4">
            <form onSubmit={handlePasswordChange}>
                <div className="form-group mb-4">
                    <label htmlFor="current_password">
                        Current Password
                    </label>
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="current_password"
                        placeholder="Enter current password"
                        required
                        onChange={handleCurrentPassword}
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="new_password">
                        New Password
                    </label>
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="new_password"
                        placeholder="Enter new password"
                        required
                        onChange={handleNewPassword}
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="confirm_password">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="confirm_password"
                        placeholder="Re-enter new password"
                        required
                        onChange={handleConfirmPassword}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-dark mt-3 col-12"
                >
                    Change Password
                </button>
            </form>
        </div>
    )
}

export default ChangePassword;