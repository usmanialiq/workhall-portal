import WHLogo from '../../assets/logo.png';
import { FaMapMarkerAlt } from 'react-icons/fa';

function UserProfile({ data }) {
    return (
        <div className='row align-items-center'>
            <div className='col-2'>
                <img 
                    src={data.image ? data.image : WHLogo} 
                    className='img-fluid user-img' 
                    alt={data.firstName} 
                    width={60}
                    height={60}
                />
            </div>
            <div className='col-5'>
                <h3 className='fw-bold'>{data.firstName} {data.lastName}</h3>
                <span className='text-primary'>Engineer</span>
            </div>
            <div className='col-5'>
                <p className='text-end'><FaMapMarkerAlt className='text-primary' /> {data.city ?? 'Karachi'}, {data.country ?? 'Pakistan'}</p>
            </div>
            <div className='col-12'>
                <p className='mt-3 fw-bold'>Excepteur do culpa incididunt laboris veniam. Pariatur anim cupidatat exercitation dolore aute cupidatat qui tempor eu. Exercitation exercitation sit et non quis eiusmod enim occaecat nostrud sint nisi dolor.</p>
            </div>
        </div>
    );
}

export default UserProfile;