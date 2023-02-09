import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const UserSettings = () => {
    const [activeTab, setActiveTab] = useState("Profile");
    const [data, setData] = useState({});
    const [password, setPassword] = useState("Abc123");
    const auth = useSelector(state => state.auth);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSaveChanges = (e) => {
        { alert("Debugger") }
        e.preventDefault();
    };

    const handlePasswordChange = (e) => {
        { alert("Debugger") }
        e.preventDefault();
    }

    const handleNameChange = (e) => {
        setData({ ...data, name: e.target.value });
    };

    const handleEmailChange = (e) => {
        setData({ ...data, email: e.target.value });
    };

    const handleCurrentPassword = (e) => {

    }

    const handleNewPassword = (e) => {
    }

    const handleConfirmPassword = (e) => {

    }

    useEffect(() => {
        setData(auth.user);
        console.log(`data: `);
        console.log(data);
    });

    return (
        <div className="container w-75">
            <div className="row">
                <div className="col-12 d-flex mt-4">
                    <h2>Account</h2>
                </div>
                <div className="col-12 d-flex">
                    <p>Set your account settings below</p>
                </div>
            </div>

            <div className="row">
                <ul className="col-12 d-flex justify-content-center nav nav-pills nav-justified m-2">
                    <li className="nav-item">
                        <a
                            href="#Profile"
                            className={`nav-link ${activeTab === "Profile" ? "active" : ""}`}
                            onClick={() => handleTabChange("Profile")}
                        >
                            Profile
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#Password"
                            className={`nav-link ${activeTab === "Password" ? "active" : ""}`}
                            onClick={() => handleTabChange("Password")}
                        >
                            Password
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#Teams"
                            className={`nav-link ${activeTab === "Teams" ? "active" : ""}`}
                            onClick={() => handleTabChange("Teams")}
                        >
                            Teams
                        </a>
                    </li>
                </ul>



                {activeTab === "Profile" && (
                    <div className="container w-50">
                        <div className="row">
                            <div className="col-2 d-flex justify-content-center">
                                <img
                                    src="https://github.com/mdo.png"
                                    alt="user-avatar"
                                    className="rounded-circle m-4"
                                    width="80" height="80"

                                />
                            </div>
                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <h4 className="text-center">{data.name}</h4>
                            </div>
                        </div>
                        <form onSubmit={handleSaveChanges}>
                            <div className="form-group mb-4">
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    id="name"
                                    placeholder="Enter your name"
                                    required
                                    defaultValue={data.name}
                                    onChange={handleNameChange}
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
                )}
                {activeTab === "Password" && (
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
                )}
            </div>
        </div>
    )
};

export default UserSettings;






//         <div className="container d-flex flex-column align-items-center">
//                 <h2 className="text-center mt-4">Account</h2>
//                 <p className="text-center mb-4">Set your account settings below</p>
//             <div className="mb-2 w-25">
//                 <ul className="nav nav-tabs">
//                     <li className="nav-item">
//                         <a
//                             href="#Profile"
//                             className={`nav-link ${activeTab === "Profile" ? "active" : ""}`}
//                             onClick={() => handleTabChange("Profile")}
//                         >
//                             Profile
//                         </a>
//                     </li>
//                     <li className="nav-item">
//                         <a
//                             href="#Password"
//                             className={`nav-link ${activeTab === "Password" ? "active" : ""}`}
//                             onClick={() => handleTabChange("Password")}
//                         >
//                             Password
//                         </a>
//                     </li>
//                     <li className="nav-item">
//                         <a
//                             href="#Teams"
//                             className={`nav-link ${activeTab === "Teams" ? "active" : ""}`}
//                             onClick={() => handleTabChange("Teams")}
//                         >
//                             Teams
//                         </a>
//                     </li>
//                 </ul>
//                 {activeTab === "Profile" && (
//                     <div className="mt-2 mb-0">
//                         <div className='d-flex align-items-center text-decoration-none' id='dropdownUser1' aria-expanded='false'>
//                             <img
//                                 src='https://github.com/mdo.png'
//                                 alt="user-avatar"
//                                 className="rounded-circle m-4 ms-2"
//                                 width="80" height="80"
//                             />
//                             <h4 className="text-center">{data.name}</h4>
//                         </div>
//                         <form onSubmit={handleSaveChanges}>
//                             <div className="form-group mt-2">
//                                 <label htmlFor="name">
//                                     Full Name
//                                     <input
//                                         type="text"
//                                         className="form-control mt-2"
//                                         id="fullname"
//                                         placeholder="Enter your name"
//                                         defaultValue={data.name}
//                                         onChange={handleNameChange}
//                                     />
//                                 </label>
//                             </div>
//                             <div className="form-group mt-2">
//                                 <label htmlFor="email">
//                                     Email
//                                     <input
//                                         type="email"
//                                         className="form-control mt-2"
//                                         id="email"
//                                         placeholder="Enter email"
//                                         defaultValue={data.email}
//                                         onChange={handleEmailChange}
//                                     />
//                                 </label>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="btn btn-dark mt-3 col-6 justify-content-center"
//                             >
//                                 Save Changes
//                             </button>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

