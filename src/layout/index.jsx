import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoImage from '../assets/logo.png';
import { logoutUser } from '../store/actions/auth';

const appRoutes = [
    { name: 'Dashboard', url: '/dashboard' }, 
    { name: 'Bookings', url: '/bookings' }, 
    { name: 'Locations', url: '/locations' }, 
    { name: 'Inventory', url: '/inventory' }, 
    { name: 'Users', url: '/users' }, 
    { name: 'Community', url: '/community' }, 
];

function Layout({ children }) {
    const routeMatch = useRouteMatch();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const routes = 
        appRoutes.map((route, idx) => (
            <li key={idx} className='mb-2'>
                <Link to={route.url} className={'nav-link' + (route.url === routeMatch.url ? ' active' : ' text-white')}>
                    {route.name}
                </Link>
            </li>
        ));

    return (
        <main>
            <div className='sidebar d-flex flex-column flex-shrink-0 p-3 bg-light'>
                <Link to='/' className='text-center text-decoration-none'>
                    <span>
                        <img 
                            src={LogoImage} 
                            className='img-fluid'
                            width={60}
                            alt='Workhall Community Portal' 
                        />
                    </span>
                </Link>
                <hr />
                <ul className='nav nav-pills flex-column mb-auto'>
                    {routes}
                </ul>
                <hr />
                <div className='dropdown'>
                    <span className='d-flex align-items-center text-white text-decoration-none dropdown-toggle' id='dropdownUser1' data-bs-toggle='dropdown' aria-expanded='false'>
                        <img src='https://github.com/mdo.png' alt='' width='32' height='32' className='rounded-circle me-2' />
                        <span className='username'>{auth.user.name}</span>
                    </span>
                    <ul className='dropdown-menu text-small shadow' aria-labelledby='dropdownUser1'>
                        <li><span className='dropdown-item' onClick={() => dispatch(logoutUser())}>Sign out</span></li>
                    </ul>
                </div>
            </div>
            <div className='container-fluid'>
                {children}
            </div>
        </main>
    );
}

export default Layout;