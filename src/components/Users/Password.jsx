import { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { users } from '../../config/api-routes';

const ChangePassword = ({ user }) => {
    const [payload, setPayload] = useState({
        oldPassword: "", 
        newPassword: "", 
        confirmPassword: "",
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${users}/change-password/${user._id}`, payload);
            if (data) {
                swal('Good Job!', 'Password updated', 'success');
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    };

    return (
        <div className="container w-50 mt-4">
            <form onSubmit={handlePasswordChange}>
                <div className="form-floating mb-4">
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="currentPassword"
                        placeholder="Enter current password"
                        required
                        value={payload.oldPassword}
                        onChange={e => setPayload({ ...payload, oldPassword: e.target.value })}
                    />
                    <label htmlFor="currentPassword">
                        Current Password
                    </label>
                </div>
                <div className="form-floating mb-4">
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="newPassword"
                        placeholder="Enter new password"
                        required
                        value={payload.newPassword}
                        onChange={e => setPayload({ ...payload, newPassword: e.target.value })}
                    />
                    <label htmlFor="newPassword">
                        New Password
                    </label>
                </div>
                <div className="form-floating mb-2">
                    <input
                        type="password"
                        className="form-control mt-2"
                        id="confirmPassword"
                        placeholder="Re-enter new password"
                        required
                        value={payload.confirmPassword}
                        onChange={e => setPayload({ ...payload, confirmPassword: e.target.value })}
                    />
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
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