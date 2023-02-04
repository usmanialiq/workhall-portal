import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import { FiMoreVertical } from 'react-icons/fi'
import { bookings } from '../../config/api-routes';

const header = ['Customer', 'Start Date', 'End Date', 'Amount', 'Payment Mode', 'Paid'];

function InventoryBookingList() {
    const [data, setData] = useState([]);
    const [inventory, setInventory] = useState({});
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
    });
    const params = useParams();
    const history = useHistory();

    const fetchBookings = useCallback(async () => {
        try {
            const { data } = await axios.get(`${bookings}/inventory/${params.id}?page=${pagination.page}`);
            setData(data.bookings);
            setInventory(data.inventory);
            setPagination({
                total: data.total,
                page: data.page,
            });
        } catch (error) {
            swal('Failed', error.response.data.message, 'error').then(() => history.push('/inventory'));
        }
    }, [pagination.page]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return (
        <div className='users container w-75 m-auto mt-5'>
            <div className='row mb-3'>
                <div className='col-3'>
                    <h2>Bookings for {inventory.title}</h2>
                </div>
                {/* <div className='col-9'>
                    <div className='row align-items-center'>
                        <div className='col-3'>
                            Date from
                            <input 
                                type='date' 
                                className='form-control d-inline' 
                                onChange={e => { setStartDate(new Date(e.target.value).valueOf()); fetchBookings(); }}
                            />
                        </div>
                        <div className='col-3'>
                            Date to
                            <input 
                                type='date' 
                                className='form-control d-inline' 
                                onChange={e => { setEndDate(new Date(e.target.value).valueOf()); fetchBookings(); }}
                            />
                        </div>
                        <div className='col-4'>
                            Payment Mode
                            <select className='form-select' onChange={e => setPaymentMode(e.target.value)}>
                                <option value=''>All</option>
                                <option value='cash'>Cash</option>
                                <option value='cheque'>Cheque</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                        <div className='col-2'>
                            Paid
                            <select className='form-select' onChange={e => setIsPaid(e.target.value)}>
                                <option value='0'>No</option>
                                <option value='1'>Yes</option>
                            </select>
                        </div>
                    </div>
                </div> */}
            </div>

            {data.length ? (
                <>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead className='table-primary-head'>
                                <tr>
                                    <td>#</td>
                                    {header.map((each, idx) => (
                                        <td key={idx}>{each}</td>
                                    ))}
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((each = {}, idx) => (
                                    <tr key={idx}>
                                        <th scope='row'>{idx + 1}</th>
                                        <td>{each.createdBy.firstName + ' ' + each.createdBy.lastName }</td>
                                        <td>{moment(each.startDate).format('DD-MMM-YYYY')}</td>
                                        <td>{moment(each.endDate).format('DD-MMM-YYYY')}</td>
                                        <td>{each.amount}</td>
                                        <td>{each.paymentMode}</td>
                                        <td>{each.isPaid ? 'Yes': 'No'}</td>
                                        <td className='text-end'>
                                            <div className="dropdown">
                                                <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FiMoreVertical />
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li><Link to={'/bookings/' + each._id} className="dropdown-item">Manage</Link></li>
                                                    <li><button className="dropdown-item" type="button">Mark as paid</button></li>
                                                </ul>
                                            </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label='Table Pagination'>
                        <ul className='pagination justify-content-end'>
                            <li className='page-item disabled'>
                                <a className='page-link'>Previous</a>
                            </li>
                            <li className='page-item'><a className='page-link' href='#'>1</a></li>
                            <li className='page-item'><a className='page-link' href='#'>2</a></li>
                            <li className='page-item'><a className='page-link' href='#'>3</a></li>
                            <li className='page-item'>
                                <a className='page-link' href='#'>Next</a>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : <p>No bookings found</p>}
        </div>
    );
}

export default InventoryBookingList;