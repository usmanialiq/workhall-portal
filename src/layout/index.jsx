function Layout({ children }) {
    return (
        <main>
            <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Workhall Community Portal</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link active" aria-current="page">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            Bookings
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            Locations
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            Inventory
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                            Users
                        </a>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <span className="username">User</span>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
            <div className="container-fluid">
                {children}
            </div>
        </main>
    );
}

export default Layout;