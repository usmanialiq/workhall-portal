import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import ChangePassword from "./Password";
import ProfileSettings from "./Profile";
import { users } from '../../config/api-routes';

const AccountSettings = () => {
    const auth = useSelector(state => state.auth);
    const [activeTab, setActiveTab] = useState("Profile");
    const [user, setUser] = useState({});

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await axios.get(`${users}/${auth.user.id}`);
            setUser(data);
        } catch(error) {
            swal('Failed', 'User not found', 'error');
        }
    }, [auth.user.id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

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
                <ul className="col-12 d-flex justify-content-center nav nav-pills nav-justified m-2 profile-header">
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



                {activeTab === "Profile" && <ProfileSettings user={user} />}
                
                {activeTab === "Password" && <ChangePassword user={user} />}
            </div>
        </div>
    )
};

export default AccountSettings;