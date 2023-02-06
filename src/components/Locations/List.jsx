import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { FiMapPin, FiMoreVertical, FiPlus } from 'react-icons/fi'
import swal from 'sweetalert';
import { locations } from '../../config/api-routes';

const header = ['Title', 'Address', 'Map', 'Phone', 'Manager'];

function LocationList() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const history = useHistory();

    const fetchLocations = useCallback(async () => {
        try {
            const { data } = await axios.get(`${locations}?title=${title}`);
            setData(data);
        } catch (error) {
            swal('Failed', error.response.data.message, 'error').then(() => history.push('/locations/new'));
        }
    }, [title]);

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    return (
        <div className='users container w-75 m-auto mt-5'>
            <div className='row mb-3'>
                <div className='col-4'>
                    <h2>Locations</h2>
                </div>
                <div className='col-3'></div>
                <div className='col-4 text-end'>
                    <input 
                        type='text' 
                        className='form-control d-inline' 
                        placeholder='Search by title' 
                        onChange={e => { setTitle(e.target.value); fetchLocations(); }}
                    />
                </div>
                <div className='col-1 text-end'>
                    <Link to='/locations/new' className='btn btn-primary btn-wh'><FiPlus /></Link>
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
                                        <td>{each.address.slice(0, 20)}...</td>
                                        <td><a href={each.mapLocation} target='_blank' rel="noreferrer"><FiMapPin /></a></td>
                                        <td>{each.phone}</td>
                                        <td>{each.manager.firstName}</td>
                                        <td className='text-end'>
                                            <div className="dropdown">
                                                <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FiMoreVertical />
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li><Link to={'/locations/' + each._id} className="dropdown-item">Manage</Link></li>
                                                    <li><button className="dropdown-item" type="button">Upload Images</button></li>
                                                    <li><button className="dropdown-item" type="button">Upload Videos</button></li>
                                                    <li><Link to={'/bookings/location/' + each._id} className="dropdown-item" type="button">Show Bookings</Link></li>
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
            ) : <p>No Locations found</p>}
        </div>
    );
}

export default LocationList;