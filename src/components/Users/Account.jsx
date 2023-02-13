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
        } catch (error) {
            swal('Failed', 'User not found', 'error');
        }
    }, [auth.user.id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className="container w-75 m-auto mt-5 pb-2">
            <h2>Account</h2>
            <p>Set your account settings below</p>

            <div className="row">
                <ul className="nav nav-pills nav-justified m-auto w-75 p-2 ">
                    <li className="nav-item link-dark">
                        <a
                            href="#Profile"
                            className={`nav-link ${activeTab === "Profile" ? "active" : ""}`}
                            style={{ color: "#000" }}
                            onClick={() => handleTabChange("Profile")}
                        >
                            Profile
                        </a>
                    </li>
                    
                    <li className="nav-item">
                        <a
                            href="#Password"
                            className={`nav-link ${activeTab === "Password" ? "active" : ""}`}
                            style={{ color: "#000" }}
                            onClick={() => handleTabChange("Password")}
                        >
                            Password
                        </a>
                    </li>

                    <li className="nav-item">
                        <a
                            href="#Teams"
                            className={`nav-link ${activeTab === "Teams" ? "active" : ""}`}
                            style={{ color: "#000" }}
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