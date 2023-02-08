import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const UserSettings = () => {
    const [activeTab, setActiveTab] = useState("Profile");
    const [data, setData] = useState({});
    const auth = useSelector(state => state.auth);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSaveChanges = (e) => {
        { alert("Debugger") }
        e.preventDefault();
    };

    const handleNameChange = (e) => {
        setData({ ...data, name: e.target.value });
    };

    const handleEmailChange = (e) => {
        setData({ ...data, email: e.target.value });
    };
    useEffect(() => {
        setData(auth.user);
        console.log(`data: `);
        console.log(data);
    });

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="">
                <h2 className="text-center mt-4">Account</h2>
                <p className="text-center mb-4">Set your account settings below</p>
            </div>
            <div className="mb-2">
                <ul className="nav nav-tabs">
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
                    <div className="mt-2 mb-0">
                        <div className='d-flex align-items-center text-decoration-none' id='dropdownUser1' aria-expanded='false'>
                            <img
                                src='https://github.com/mdo.png'
                                alt="user-avatar"
                                className="rounded-circle m-4 ms-2"
                                width="80" height="80"
                            />
                            <h4 className="text-center">{data.name}</h4>
                        </div>
                        <form onSubmit={handleSaveChanges}>
                            <div className="form-group mt-2">
                                <label htmlFor="name">
                                    Full Name
                                    <input
                                        type="text"
                                        id="fullname"
                                        placeholder="Enter your name"
                                        className="form-control mt-2"
                                        defaultValue={data.name}
                                        onChange={handleNameChange}
                                    />
                                </label>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control mt-2"
                                    id="email"
                                    placeholder="Enter email"
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
            </div>
        </div>
    );
};

export default UserSettings;
