import { React } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { users } from '../../config/api-routes';

const TeamsSettings = ({ user }) => {

    let dataToSubmit = { businessType: user.businessType, companyName: user.companyName, companyWebsite: user.companyWebsite, companyDesc: user.companyDesc };

    const handleBusinessType = e => {
        e.preventDefault();
        dataToSubmit.businessType = e.target.value;
    };

    const handleCompanyName = e => {
        e.preventDefault();
        dataToSubmit.companyName = e.target.value;
    };

    const handleCompanyWebsite = e => {
        e.preventDefault();
        dataToSubmit.companyWebsite = e.target.value;
    };

    const handleCompanyDesc = e => {
        e.preventDefault();
        dataToSubmit.companyDesc = e.target.value;
    };

    const handleSubmit = async (e) => {
        alert("submit");
        try {
            const { data } = await axios.put(`${users}/${user._id}`, dataToSubmit);
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
                <div className="form-group mb-3">
                    <label htmlFor="businessType">
                        Business Type
                    </label>
                    <input
                        type="text"
                        className="form-control mt-2"
                        id="businessType"
                        defaultValue={user.businessType}
                        placeholder="Enter Business Type"
                        required
                        onChange={handleBusinessType}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="companyName">
                        Company Name
                    </label>
                    <input
                        type="text"
                        className="form-control mt-2"
                        id="companyName"
                        defaultValue={user.companyName}
                        placeholder="Enter Company Name"
                        required
                        onChange={handleCompanyName}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="companyWebsite">
                        Company Website
                    </label>
                    <input
                        type="url"
                        className="form-control mt-2"
                        id="companyWebsite"
                        defaultValue={user.companyWebsite}
                        placeholder="Enter Company Website"
                        required
                        onChange={handleCompanyWebsite}
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="companyDesc">
                        Company Description
                    </label>
                    <textarea
                        className='form-control mt-2 c-textarea'
                        id='companyDesc'
                        defaultValue={user.companyDesc}
                        required
                        placeholder='Set description of the Company'
                        onChange={handleCompanyDesc}
                    ></textarea>
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