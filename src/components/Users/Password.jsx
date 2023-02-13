import { React, useState, useEffect } from "react";

const ChangePassword = (user) => {
    const [password, setPassword] = useState("Abc123");
    
    const handlePasswordChange = (e) => {
        { alert("Debugger") }
        e.preventDefault();
    }

    const handleCurrentPassword = (e) => {

    }

    const handleNewPassword = (e) => {
    }

    const handleConfirmPassword = (e) => {

    }

    return (
        <div className="container w-50 mt-5">
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