import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';
import { bookings, inventory, locations, users } from '../../config/api-routes';
import { diffInDays, diffInHours, diffInMonths } from '../../utils/dates';
import WHLogo from '../../assets/logo.png';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const paymentModes = ['Cash', 'Cheque', 'Other'];

function CreateBooking() {
    const [payload, setPayload] = useState({
        startDate: moment().format('yyyy-MM-DD'),
        endDate: moment().format('yyyy-MM-DD'),
        hoursFrom: moment().format('HH:mm:ss'),
        hoursTo: moment().add('hours', 1).format('HH:mm:ss'),
        isMonthly: true,
        amount: 0,
        isPaid: false,
        paymentMode: 'cash',
        inventory: '',
        location: '',
        createdBy: '',
        notes: '',
    });
    const [criteria, setCriteria] = useState(1);
    const [locationsData, setLocations] = useState([]);
    const [inventoryData, setInventory] = useState([]);
    const [usersData, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

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
            const { data } = await axios.get(`${inventory}?location=${payload.location}`);
            setInventory(data.inventory);
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, [payload.location]);

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    const handleUsers = useCallback(async (query) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${users}?search=${query}&type=user`);
            setUsers(data.users);
        } catch (error) {}
        setIsLoading(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let dataToSubmit = payload;
        dataToSubmit = {
            ...dataToSubmit,
            startDate: moment(payload.startDate).valueOf(),
            endDate: moment(payload.endDate).valueOf(),
            hoursFrom: moment(payload.startDate + ':' + payload.hoursFrom).valueOf(),
            hoursTo: moment(payload.endDate + ':' + payload.hoursTo).valueOf(),
        };
        console.log("🚀 ~ file: Create.jsx:69 ~ handleSubmit ~ dataToSubmit", dataToSubmit)

        // try {
        //     const { data } = await axios.post(bookings, dataToSubmit);
        //     if (data) {
        //         swal('Good Job!', 'Booking created successfully', 'success');
        //     }
        // } catch (error) {
        //     swal('Failed', error.response.data.message, 'error');
        // }
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setPayload({ ...payload, isMonthly: +val === 1 });
        setCriteria(+val);
        handleAmount();
    };

    const handleAmount = () => {
        let amount = 0;
        const inventory = inventoryData.filter((each) => each._id = payload.inventory)[0];
        const valueOf = {
            startDate: moment(payload.startDate).valueOf(),
            endDate: moment(payload.endDate).valueOf(),
            hoursFrom: moment(payload.startDate + ':' + payload.hoursFrom).valueOf(),
            hoursTo: moment(payload.endDate + ':' + payload.hoursTo).valueOf(),
        };
        if (criteria === 1) {
            amount = inventory.pricePerMonth * 
                diffInMonths(valueOf.startDate, valueOf.endDate);
        }
        if (criteria === 2) {
            amount = inventory.pricePerDay *
                diffInDays(valueOf.startDate, valueOf.endDate);
        }
        if (criteria === 3) {
            amount = inventory.pricePerHour *
                diffInHours(valueOf.hoursFrom, valueOf.hoursTo);
        }
        console.log("🚀 ~ file: Create.jsx:110 ~ handleAmount ~ amount", amount)        
        // setPayload({ ...payload, amount });
        return;
    }

    return (
        <div className='container w-50 bg-white p-3 rounded m-auto mt-5'>
            <h2>Create new Booking</h2>
            <div className='row mt-5 justify-content-center'>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <select 
                            className='form-select' 
                            id='locations' 
                            required 
                            value={payload.location}
                            onChange={async e => { setPayload({ ...payload, location: e.target.value }); await fetchInventory(); }}>
                                <option></option>
                                {locationsData
                                    .map((each) => <option key={each._id} value={each._id}>{each.title}</option>
                                )}
                        </select>
                        <label htmlFor='locations'>Location *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <select 
                            className='form-select' 
                            id='inventory' 
                            required 
                            value={payload.inventory}
                            onChange={e => { setPayload({ ...payload, inventory: e.target.value }); }}>
                                <option></option>
                                {inventoryData
                                    .map((each) => <option key={each._id} value={each._id}>{each.title}</option>
                                )}
                        </select>
                        <label htmlFor='inventory'>Inventory *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='date' 
                            className='form-control' 
                            id='startDate' 
                            value={payload.startDate}
                            onChange={e => { setPayload({ ...payload, startDate: e.target.value }); handleAmount();}}
                            required
                        />
                        <label htmlFor='startDate'>Start Date *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='date' 
                            className='form-control' 
                            id='endDate' 
                            value={payload.endDate}
                            onChange={e => { setPayload({ ...payload, endDate: e.target.value }); handleAmount();}}
                            required
                        />
                        <label htmlFor='endDate'>End Date *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='time' 
                            className='form-control' 
                            id='hoursFrom' 
                            value={payload.hoursFrom}
                            onChange={e => { setPayload({ ...payload, hoursFrom: e.target.value }); handleAmount();}}
                            required
                        />
                        <label htmlFor='hoursFrom'>Hours from</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='time' 
                            className='form-control' 
                            id='hoursTo' 
                            value={payload.hoursTo}
                            onChange={e => { setPayload({ ...payload, hoursTo: e.target.value }); handleAmount();}}
                            required
                        />
                        <label htmlFor='hoursTo'>Hours to</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <input 
                            type='number' 
                            className='form-control' 
                            id='amount' 
                            value={payload.amount}
                            onChange={e => setPayload({ ...payload, amount: e.target.value })}
                            required
                        />
                        <label htmlFor='amount'>Amount *</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <AsyncTypeahead 
                            id='users'
                            className='form-control'
                            isLoading={isLoading}
                            filterBy={() => true}
                            minLength={3}
                            onSearch={handleUsers}
                            options={usersData}
                            onChange={e => setPayload({ ...payload, createdBy: e[0]._id })}
                            labelKey='email'
                            inputProps={{ className: 'revert-form-control' }}
                            renderMenuItemChildren={(option) => (
                                <>
                                    <img 
                                        src={option.image ?? WHLogo} 
                                        className='img-fluid'
                                        style={{
                                            height: '24px',
                                            marginRight: '10px',
                                            width: '24px',
                                        }}
                                        alt={option.firstName}
                                    />
                                    <span>{option.firstName} - {option.email}</span>
                                </>
                            )}
                        />
                        <label htmlFor='users'>Search User *</label>
                    </div>
                </div>
                <div className='col-12 mb-3'>
                    <span>Select costing criteria </span>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            id="subscription1" 
                            value="1" 
                            checked={criteria === 1}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="subscription1">Per Month</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            id="subscription2" 
                            value="2" 
                            checked={criteria === 2}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="subscription2">Per Day</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            id="subscription3" 
                            value="3" 
                            checked={criteria === 3}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="subscription3">Per Hour</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            id="subscription4" 
                            value="4" 
                            checked={criteria === 4}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="subscription4">Per Min</label>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='form-floating mb-3'>
                        <select 
                            className='form-select' 
                            id='paymentMode' 
                            required 
                            value={payload.paymentMode}
                            onChange={e => setPayload({ ...payload, paymentMode: e.target.value })}>
                                <option></option>
                                {paymentModes
                                    .map((each, idx) => <option key={idx} value={each}>{each}</option>
                                )}
                        </select>
                        <label htmlFor='paymentMode'>Payment Mode *</label>
                    </div>
                </div>
                <div className='col-3'>
                    <div className="form-check pt-3">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={payload.isPaid} 
                            id="isPaid" 
                            onChange={e => setPayload({ ...payload, isPaid: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="isPaid">
                            Mark as paid
                        </label>
                    </div>
                </div>
                <div className='col-3' />
                <div className='col-12'>
                    <div className='form-floating mb-3'>
                        <textarea 
                            className='form-control' 
                            id='notes' 
                            value={payload.notes}
                            onChange={e => setPayload({ ...payload, notes: e.target.value})}
                            placeholder='Add details for the payment'
                        ></textarea>
                        <label htmlFor='notes'>Notes</label>
                    </div>
                </div>
                <div className='col-3'>
                    <button className='btn btn-primary btn-wh w-100' disabled={!payload.amount} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreateBooking;