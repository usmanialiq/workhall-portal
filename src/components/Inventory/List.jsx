import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiMoreVertical } from 'react-icons/fi'
import swal from 'sweetalert';
import { inventory, locations } from '../../config/api-routes';

const header = ['Title', 'Category', '$/hr', '$/day', '$/month', 'Location'];
export const categories = ['Open', 'Exclusive', 'Meetings'];

function InventoryList() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [locationsData, setLocations] = useState([]);
    const history = useHistory();

    const fetchInventory = useCallback(async () => {
        try {
            const { data } = await axios.get(`${inventory}?title=${title}&category=${category}&location=${location}`);
            setData(data.inventory);
        } catch (error) {
            swal('Failed', error.response.data.message, 'error').then(() => history.push('/inventory/new'));
        }
    }, [title, category, location]);

    const fetchLocations = useCallback(async () => {
        try {
            const { data } = await axios.get(`${locations}`);
            setLocations(data);
        } catch (error) {
            swal('Failed', error.response.data.message, 'error').then(() => history.push('/locations/new'));
        }
    }, []);

    useEffect(() => {
        fetchInventory();
        fetchLocations();
    }, [fetchInventory, fetchLocations]);

    return (
        <div className='users container w-75 m-auto mt-5'>
            <div className='row mb-3'>
                <div className='col-2'>
                    <h2>Inventory</h2>
                </div>
                <div className='col-3 text-end'>
                    <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Search by title' 
                        onChange={e => { setTitle(e.target.value); fetchInventory(); }}
                    />
                </div>
                <div className='col-6'>
                    <div className='row align-items-center'>
                        <div className='col-4 text-end'>Filter By:</div>
                        <div className='col-4'>
                            <select className='form-select' onChange={e => { setCategory(e.target.value); fetchInventory(); }}>
                                <option value=''>Category</option>
                                {categories.map((each, idx) => <option key={idx} value={each}>{each}</option>)}
                            </select>
                        </div>
                        <div className='col-4'>
                            <select className='form-select' onChange={e => { setLocation(e.target.value); fetchInventory(); }}>
                                <option value=''>Location</option>
                                {locationsData.map((each, idx) => <option key={idx} value={each._id}>{each.title}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col-1 text-end'>
                    <Link to='inventory/new' className='btn btn-primary btn-wh'><FiPlus /></Link>
                </div>
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
                                        <td>{each.title}</td>
                                        <td>{each.category}</td>
                                        <td>{each.pricePerHour}</td>
                                        <td>{each.pricePerDay}</td>
                                        <td>{each.pricePerMonth}</td>
                                        <td>{each.location.title}</td>
                                        <td className='text-end'>
                                            <div className="dropdown">
                                                <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FiMoreVertical />
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li><Link to={'/inventory/' + each._id} className="dropdown-item">Manage</Link></li>
                                                    <li><button className="dropdown-item" type="button">Upload Images</button></li>
                                                    <li><Link to={'/bookings/inventory/' + each._id} className="dropdown-item" type="button">Show Bookings</Link></li>
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
            ) : <p>No Inventory found</p>}
        </div>
    );
}

export default InventoryList;