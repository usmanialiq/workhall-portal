import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router-dom';
import { locations, users } from '../../config/api-routes';

function CreateLocation() {
    const [data, setData] = useState({
        title: '',
        address: '',
        mapLocation: '',
        phone: '',
        manager: '',
    });
    const [usersData, setUsers] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const history = useHistory();
    const params = useParams();

    const fetchUsers = useCallback(async () => {
        try {
            const { data } = await axios.get(`${users}?type=manager`);
            setUsers(data.users);
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, []);

    const fetchLocation = useCallback(async () => {
        try {
            const { data } = await axios.get(`${locations}/${params.id}`);
            setData({...data, manager: data.manager._id});
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, [params.id]);

    useEffect(() => {
        if (params.id) {
            setEdit(true);
            fetchLocation();
        }
        fetchUsers();
    }, [fetchLocation, fetchUsers, params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = data;
        
        try {
            if (isEdit) {
                const { data } = await axios.put(`${locations}/${params.id}`, payload);
                if (data) {
                    swal('Good Job!', 'Location updated', 'success')
                        .then(() => history.push('/locations'));
                }
            } else {
                const { data } = await axios.post(locations, payload);
                if (data) {
                    swal('Good Job!', 'Location created', 'success')
                        .then(() => history.push('/locations'));
                }
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }

    return (
        <div className='container w-50 bg-white p-3 rounded m-auto mt-5'>
            <h2>{isEdit ? 'Edit location' : 'Create a new location'}</h2>
            <div className='row mt-5 justify-content-center'>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='title' 
                            value={data.title}
                            onChange={e => setData({ ...data, title: e.target.value})}
                            required
                        />
                        <label htmlFor='title'>Title *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='address' 
                            value={data.address}
                            onChange={e => setData({ ...data, address: e.target.value})}
                            required
                        />
                        <label htmlFor='address'>Address *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <select className='form-select' id='users' required onChange={e => setData({ ...data, manager: e.target.value})}>
                            {usersData.map((each) => <option key={each._id} value={each._id}>{each.firstName} {each.lastName}</option>)}
                        </select>
                        <label htmlFor='users'>Manager *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='phone' 
                            value={data.phone}
                            onChange={e => setData({ ...data, phone: e.target.value})}
                            required
                        />
                        <label htmlFor='phone'>Phone *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <textarea 
                            className='form-control' 
                            id='mapLocation' 
                            value={data.mapLocation}
                            onChange={e => setData({ ...data, mapLocation: e.target.value})}
                            placeholder='Paste the google location here'
                            required
                        ></textarea>
                        <label htmlFor='mapLocation'>Map Location *</label>
                    </div>
                </div>
                <div className='col-6'></div>
                <div className='col-3'>
                    <button className='btn btn-primary btn-wh w-100' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateLocation;