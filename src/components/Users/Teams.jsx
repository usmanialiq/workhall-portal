import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import { users } from '../../config/api-routes';

const TeamsSettings = ({ user }) => {
    const [payload, setPayload] = useState({
        businessType: "", 
        companyName: "", 
        companyWebsite: "", 
        companyDesc: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${users}/${user._id}`, payload);
            if (data) {
                swal('Good Job!', 'User updated', 'success');
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }

    return (
        <div className="container w-50 mt-4">
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="businessType"
                        defaultValue={user.businessType}
                        placeholder="Enter Business Type"
                        required
                        onChange={e => setPayload({...payload, businessType: e.target.value})}
                    >
                        <option></option>
                        <option value='indiviudal'>Individual</option>
                        <option value='company'>Company</option>
                    </select>
                    <label htmlFor="businessType">
                        Business Type
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control mt-2"
                        id="companyName"
                        defaultValue={user.companyName}
                        placeholder="Enter Company Name"
                        required
                        onChange={e => setPayload({...payload, companyName: e.target.value})}
                    />
                    <label htmlFor="companyName">
                        Company Name
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="url"
                        className="form-control mt-2"
                        id="companyWebsite"
                        defaultValue={user.companyWebsite}
                        placeholder="Enter Company Website"
                        required
                        onChange={e => setPayload({...payload, companyWebsite: e.target.value})}
                    />
                    <label htmlFor="companyWebsite">
                        Company Website
                    </label>
                </div>
                <div className="form-floating mb-2">
                    <textarea
                        className='form-control mt-2 c-textarea'
                        id='companyDesc'
                        defaultValue={user.companyDesc}
                        required
                        placeholder='Set description of the Company'
                        onChange={e => setPayload({...payload, companyDesc: e.target.value})}
                    ></textarea>
                    <label htmlFor="companyDesc">
                        Company Description
                    </label>
                </div>
                <button
                    type="submit"
                    className="btn btn-dark mt-2 col-12"
                >
                    Update Changes
                </button>
            </form>
        </div>
    )
}

export default TeamsSettings;