import { useState } from "react";
import { users } from '../../config/api-routes';
import axios from 'axios';
import swal from 'sweetalert';

function GrantAccess({ id, type, reload }) {
    const [userType, setUserType] = useState(type);

    const handleOnSubmit = async (e) => {
        try {
            const { data } = await axios.put(`${users}/${id}`, { type: userType });
            if (data) {
                swal('Good Job!', 'User Type updated', 'success').then(() => {
                    document.getElementById('modal-close').click();
                    reload(true);
                });
            }
         } catch (error) {
            swal('Failed', error.response.data.message, 'error').then(() => {
                document.getElementById('modal-close').click();
            });;
        }
    };


    return (
        <div className="modal fade" id="grantAccess" tabIndex="-1" aria-labelledby="grantAccessLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-end mb-3">
                            <button type="button" id='modal-close' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="text-center">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    id="floatingSelect"
                                    value={userType}
                                    onChange={e => setUserType(e.target.value)} >
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="member">Member</option>
                                </select>
                                <label htmlFor="floatingSelect">Select User Type</label>
                            </div>
                            <div> <button className="mt-3 btn btn-primary btn-main" onClick={handleOnSubmit}> Grant Access</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrantAccess;
