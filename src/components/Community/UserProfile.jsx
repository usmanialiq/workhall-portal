import WHLogo from '../../assets/logo.png';
import { FaMapMarkerAlt } from 'react-icons/fa';

function UserProfile({ data }) {
    return (
        <div className='row align-items-center'>
            <div className='col-3'>
                <img 
                    src={data.image ? data.image : WHLogo} 
                    className='user-img' 
                    alt={data.firstName} 
                    width={60}
                    height={60}
                />
            </div>
            <div className='col-9 text-end'>
                <h3 className='fw-bold'>{data.firstName} {data.lastName}</h3>
                <span className='text-primary '>Engineer</span>
            </div>
            <div className='col-12'>
                <p className='text-end'><FaMapMarkerAlt className='text-primary' /> {data.city ?? 'Karachi'}, {data.country ?? 'Pakistan'}</p>
            </div>
            <div className='col-12'>
                <p className='mt-3 fw-bold'> {data.bio}</p>
            </div>
            <hr />
            <div className='col-12'>
                <h4 className='fw-bold'>Business</h4>
                <div>Company Name:  {data.companyName}</div>
                <div>Type: {data.businessType}</div>
                <a href={data.companyWebsite}>Website: {data.companyWebsite}</a>
                <div>Description: {data.companyDesc}</div>
            </div>
        </div>
    );
}

export default UserProfile;