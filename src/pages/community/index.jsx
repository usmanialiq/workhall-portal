import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { users } from '../../config/api-routes';
import WHLogo from '../../assets/logo.png';
import UserProfile from '../../components/Community/UserProfile';

function Community() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
    });
    const [text, setText] = useState('');

    const fetchUsers = useCallback(async () => {
        try {
            const { data } = await axios.get(`${users}?page=${pagination.page}&type=user&search=${text}`);
            setData(data.users);
            setPagination({
                total: data.total,
                page: data.page,
            });
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, [pagination.page, text]);
    

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className='container w-75 m-auto mt-5'>
            <div className='row mb-3'>
                <div className='col-4'>
                    <h2>Users</h2>
                </div>
                <div className='col-4' />
                <div className='col-4 text-end'>
                    <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Search by name or email' 
                        onChange={e => setText(e.target.value)}
                    />
                </div>
            </div>
            {data.length ? (
                <div className='row'>
                    {data.map((each) => (
                        <div className='col-sm-12 col-md-6' key={each._id}>
                            <div className='card'>
                                <div className='card-body'>
                                    <UserProfile data={each} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ): 'No members to show'}
        </div>
    );
}

export default Community;