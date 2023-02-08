import { Link, useRouteMatch } from 'react-router-dom';
import LogoImage from '../assets/logo.png';

import Navbar from './Nav';

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
            </div>
            <div className='container-fluid'>
                <Navbar />
                {children}
            </div>
        </main>
    );
}

export default Layout;