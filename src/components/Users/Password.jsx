import { React } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { users } from '../../config/api-routes';
import { useHistory } from "react-router-dom";

const ChangePassword = ({ user }) => {
    const history = useHistory();
    console.log("🚀 ~ file: Password.jsx:8 ~ ChangePassword ~ user", user)


    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (temp.currPassword === user.password) {
            if (temp.newPassword === temp.confirmPassword) {
                try {
                    const { data } = await axios.put(`${users}/${user._id}`, dataToSubmit, 'data updated').then(res => {console.log(`res: `, res);});
                    
                    console.log("🚀 ~ file: Profile.jsx:46 ~ handleSaveChanges ~ data", data)
                    if (data) {
                        swal('Good Job!', 'Password updated', 'success').then(() => history.push('/users'));
                    }
                } catch (error) {
                    swal('Failed', error.response.data.message, 'error');
                }
            } else {
                swal('Failed', 'Password donot match!', 'error');
            }
        } else {
            swal('Failed', "Current Password Incorrect!", 'error');
        }
    }
    let dataToSubmit = {password: user.password}
    let temp = {currPassword: "", newPassword: "", confirmPassword: ""};
    const handleCurrentPassword = (e) => {
        e.preventDefault();
        temp.currPassword = e.target.value;
        console.log("🚀 ~ file: Password.jsx:37 ~ handleCurrentPassword ~ e.target.value", e.target.value)
    }

    const handleNewPassword = (e) => {
        e.preventDefault();
        temp.newPassword = e.target.value;
        console.log("🚀 ~ file: Password.jsx:43 ~ handleNewPassword ~ e.target.value", e.target.value)
    }

    const handleConfirmPassword = (e) => {
        e.preventDefault();
        temp.confirmPassword = e.target.value;
        console.log("🚀 ~ file: Password.jsx:49 ~ handleConfirmPassword ~ e.target.value", e.target.value)
    }

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