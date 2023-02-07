import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router-dom';
import { inventory, locations } from '../../config/api-routes';
import { categories } from './List';

function CreateInventory() {
    const [data, setData] = useState({
        title: '',
        category: '',
        pricePerHour: 0,
        pricePerDay: 0,
        pricePerMonth: 0,
        pricePerMin: 0,
        location: '',
    });
    const [locationsData, setLocations] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const history = useHistory();
    const params = useParams();

    const fetchLocations = useCallback(async () => {
        try {
            const { data } = await axios.get(`${locations}`);
            setLocations(data);
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, []);

    const fetchInventory = useCallback(async () => {
        try {
            const { data } = await axios.get(`${inventory}/${params.id}`);
            setData({...data, location: data.location._id});
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, [params.id]);

    useEffect(() => {
        if (params.id) {
            setEdit(true);
            fetchInventory();
        }
        fetchLocations();
    }, [fetchInventory, fetchLocations, params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = data;
        payload.pricePerDay = +payload.pricePerDay;
        payload.pricePerHour = +payload.pricePerHour;
        payload.pricePerMin = +payload.pricePerMin;
        payload.pricePerMonth = +payload.pricePerMonth;

        
        try {
            if (isEdit) {
                const { data } = await axios.put(`${inventory}/${params.id}`, payload);
                if (data) {
                    swal('Good Job!', 'Inventory updated', 'success')
                        .then(() => history.push('/inventory'));
                }
            } else {
                const { data } = await axios.post(inventory, payload);
                if (data) {
                    swal('Good Job!', 'Inventory created', 'success')
                        .then(() => history.push('/inventory'));
                }
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }

    return (
        <div className='container w-50 bg-white p-3 rounded m-auto mt-5'>
            <h2>{isEdit ? 'Edit inventory' : 'Create a new inventory'}</h2>
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
                        <select 
                            className='form-select' 
                            id='category' 
                            value={data.category}
                            required 
                            onChange={e => setData({ ...data, category: e.target.value})}>
                                <option></option>
                            {categories.map((each, idx) => <option key={idx} value={each}>{each}</option>)}
                        </select>
                        <label htmlFor='category'>Category</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <select 
                            className='form-select' 
                            id='locations' 
                            value={data.location}
                            required 
                            onChange={e => setData({ ...data, location: e.target.value})}>
                            <option></option>
                            {locationsData.map((each) => <option key={each._id} value={each._id}>{each.title}</option>)}
                        </select>
                        <label htmlFor='locations'>Location *</label>
                    </div>
                </div>
                <div className='col-6'></div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='number' 
                            className='form-control' 
                            id='pricePerMin' 
                            value={data.pricePerMin}
                            onChange={e => setData({ ...data, pricePerMin: e.target.value})}
                            required
                        />
                        <label htmlFor='pricePerMin'>Price Per Min</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='number' 
                            className='form-control' 
                            id='pricePerHour' 
                            value={data.pricePerHour}
                            onChange={e => setData({ ...data, pricePerHour: e.target.value})}
                            required
                        />
                        <label htmlFor='pricePerHour'>Price Per Hour *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='number' 
                            className='form-control' 
                            id='pricePerDay' 
                            value={data.pricePerDay}
                            onChange={e => setData({ ...data, pricePerDay: e.target.value})}
                            required
                        />
                        <label htmlFor='pricePerDay'>Price Per Day *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='number' 
                            className='form-control' 
                            id='pricePerMonth' 
                            value={data.pricePerMonth}
                            onChange={e => setData({ ...data, pricePerMonth: e.target.value})}
                            required
                        />
                        <label htmlFor='pricePerMonth'>Price Per Month *</label>
                    </div>
                </div>
                <div className='col-3'>
                    <button className='btn btn-primary btn-wh w-100' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateInventory;