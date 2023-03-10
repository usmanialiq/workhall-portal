import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../store/actions/auth';
import avatar from '../assets/placeholder.png';

function Navbar() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // console.log(auth);

    return (
        <nav className="navbar navbar-expand-lg navbar-light border-bottom">
            <div className="container-fluid px-5">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <span className='d-flex align-items-center text-white text-decoration-none dropdown-toggle' id='dropdownUser1' data-bs-toggle='dropdown' aria-expanded='false'>
                                <img src={auth.user.image ? auth.user.image : avatar} alt='' width='32' height='32' className='rounded-circle me-2' />
                                <span className='username'>{auth.user.name}</span>
                            </span>
                            <ul className='dropdown-menu text-small shadow' aria-labelledby='dropdownUser1'>
                                <li><Link to={'/users/account/' + auth.user.id} className='dropdown-item'>My Profile</Link></li>
                                <li><span className='dropdown-item' onClick={() => dispatch(logoutUser())}>Sign out</span></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;