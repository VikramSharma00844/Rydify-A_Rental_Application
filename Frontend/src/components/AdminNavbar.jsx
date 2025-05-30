import {Link, useNavigate} from "react-router-dom";

function AdminNavbar() {
    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();
        document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // clear cookie
        navigate('/admin-login');
    }

    return (
        <>


            {/* Header */}
            {/*<header className="main-header">*/}
            {/*    <div className="header-sticky">*/}
            {/*        <nav className="navbar navbar-expand-lg">*/}
            {/*            <div className="container">*/}
            {/*                /!* Logo *!/*/}
            {/*                <Link className="navbar-brand" to="/admin/dashboard">*/}
            {/*                    <img src="/images/logo.svg" alt="Logo" style={{ width: "130px" }} />*/}
            {/*                </Link>*/}

            {/*                /!* Navigation Menu *!/*/}
            {/*                <div className="collapse navbar-collapse main-menu">*/}
            {/*                    <div className="nav-menu-wrapper">*/}
            {/*                        <ul className="navbar-nav mr-auto" id="menu">*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/admin/manage_admin">Admins</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item submenu">*/}
            {/*                                <Link className="nav-link" to={""}>Manage</Link>*/}
            {/*                                <ul>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/admin/manage_dealer">Dealers</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/admin/manage_category">Category</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/admin/manage_driver">Driver</Link>*/}
            {/*                                    </li>*/}
            {/*                                </ul>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/admin/view_booking">View Booking</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item submenu">*/}
            {/*                                <Link className="nav-link" to={""}>Settings</Link>*/}
            {/*                                <ul>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/admin/changePassword">Change Password</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/admin/logout" onClick={handleLogout}>Logout</Link>*/}
            {/*                                    </li>*/}
            {/*                                </ul>*/}
            {/*                            </li>*/}
            {/*                        </ul>*/}
            {/*                    </div>*/}

            {/*                    /!* Optional header button *!/*/}
            {/*                    /!* <div className="header-btn d-inline-flex">*/}
            {/*                    <Link to="/admin/some_action" className="btn-default">Book a Rental</Link>*/}
            {/*                </div> *!/*/}
            {/*                </div>*/}

            {/*                <div className="navbar-toggle"></div>*/}
            {/*            </div>*/}
            {/*        </nav>*/}
            {/*        <div className="responsive-menu"></div>*/}
            {/*    </div>*/}
            {/*</header>*/}


            <header className="site-header header-style-1 mobile-sider-drawer-menu light-hdr">
                <div className="header-middle-wraper sticky-header">
                    <div className="header-middle main-bar">
                        <div className="logo-header">
                            <div className="logo-header-inner logo-header-one">
                                <Link to="/home">
                                    <img src="/images2/rydifyLogo.png" alt="Logo"/>
                                </Link>
                            </div>
                        </div>

                        <div className="header-info-wraper">
                            <div className="main-bar-wraper navbar-expand-lg">
                                <div className="header-bottom">
                                    <div className="container-block clearfix">
                                        <div className="navigation-bar">

                                            <div
                                                className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-between">
                                                <ul className="nav navbar-nav">
                                                    <li><Link to="/admin/dashboard">Home</Link>

                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="/admin/manage_admin">Admins</Link>
                                                    </li>


                                                    <li className="has-child">
                                                        <Link to={""}>Manage</Link>
                                                        <ul className="sub-menu">
                                                            <li>
                                                                <Link
                                                                    to="/admin/manage_dealer">Dealers</Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    to="/admin/manage_category">Category</Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    to="/admin/manage_driver">Driver</Link>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                    <li>
                                                        <Link to="/admin/view_booking">View
                                                            Booking</Link>
                                                    </li>


                                                    <li className="has-child">
                                                        <Link to="">Settings</Link>
                                                        <ul className="sub-menu">
                                                            <li>
                                                                <Link to="/admin/changePassword">Change
                                                                    Password</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/admin/logout"
                                                                      onClick={handleLogout}>Logout</Link>
                                                            </li>
                                                        </ul>
                                                    </li>


                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Header Right Section */}
                        <div className="extra-nav header-1-nav">
                            <div className="extra-cell one">

                            </div>
                        </div>
                    </div>
                </div>
            </header>


        </>
    )
}

export default AdminNavbar;