import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { FiMoreVertical } from 'react-icons/fi'
import { users } from '../../config/api-routes';

const header = ['First Name', 'Last Name', 'Email', 'Phone', 'Type', 'Verified'];

function UserList() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
    });
    const [type, setType] = useState('');
    const [text, setText] = useState('');

    const fetchUsers = useCallback(async () => {
        try {
            const { data } = await axios.get(`${users}?page=${pagination.page}&type=${type}&search=${text}`);
            setData(data.users);
            setPagination({
                total: data.total,
                page: data.page,
            });
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, [pagination.page, text, type]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className='users container w-75 m-auto mt-5'>
            <div className='row mb-3'>
                <div className='col-4'>
                    <h2>Users</h2>
                </div>
                <div className='col-4 text-end'>
                    <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Search by name or email' 
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className='col-4'>
                    <div className='row align-items-center'>
                        <div className='col-6 text-end'>Filter By:</div>
                        <div className='col-6'>
                            <select className='form-select' onChange={e => setType(e.target.value)}>
                                <option value=''>User Type</option>
                                <option value='admin'>Admin</option>
                                <option value='manager'>Manager</option>
                                <option value='user'>User</option>
                            </select>
                        </div>
                    </div>
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
                                        <td>{each.firstName}</td>
                                        <td>{each.lastName}</td>
                                        <td>{each.email}</td>
                                        <td>{each.phone}</td>
                                        <td>{each.type}</td>
                                        <td>{each.verified ? 'Yes' : 'No'}</td>
                                        <td className='text-end'>
                                            <div className="dropdown">
                                                <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FiMoreVertical />
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li><Link to={'/users/' + each._id} className="dropdown-item">Manage</Link></li>
                                                    <li><button className="dropdown-item" type="button">Block Access</button></li>
                                                    <li><button className="dropdown-item" type="button">Show Bookings</button></li>
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
            ) : <p>No Users found</p>}
        </div>
    );
}

export default UserList;