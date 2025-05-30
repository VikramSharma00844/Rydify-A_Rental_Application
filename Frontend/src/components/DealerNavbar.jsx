import {Link, useNavigate} from "react-router-dom";


function DealerNavbar() {
    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();
        document.cookie = "dealerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // clear cookie
        navigate('/dealer-login');
    }
    return (
        <>


            {/* Header */}
            {/*<header className="main-header">*/}
            {/*    <div className="header-sticky">*/}
            {/*        <nav className="navbar navbar-expand-lg">*/}
            {/*            <div className="container">*/}
            {/*                /!* Logo *!/*/}
            {/*                <Link className="navbar-brand" to="/dealer/dashboard">*/}
            {/*                    <img src="/images/logo.svg" alt="Logo" style={{ width: "130px" }} />*/}
            {/*                </Link>*/}

            {/*                /!* Main Menu *!/*/}
            {/*                <div className="collapse navbar-collapse main-menu">*/}
            {/*                    <div className="nav-menu-wrapper">*/}
            {/*                        <ul className="navbar-nav mr-auto" id="menu">*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/dealer/dashboard">Dashboard</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/dealer/manage_vehicle">Manage Vehicle</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item submenu">*/}
            {/*                                <Link className="nav-link" to={""}>Booking Request</Link>*/}
            {/*                                <ul>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/dealer/manage_booking_req">Pending Requests</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/dealer/view_approved_req">Approved Requests</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/dealer/view_completed_req">Completed Requests</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/dealer/view_cancelled_req">Cancelled Requests</Link>*/}
            {/*                                    </li>*/}
            {/*                                </ul>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item submenu">*/}
            {/*                                <Link className="nav-link" to={""}>Settings</Link>*/}
            {/*                                <ul>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/dealer/changePassword">Change Password</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/dealer/profile">Profile</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/dealer/logout" onClick={handleLogout}>Logout</Link>*/}
            {/*                                    </li>*/}
            {/*                                </ul>*/}
            {/*                            </li>*/}
            {/*                        </ul>*/}
            {/*                    </div>*/}

            {/*                    /!* Back Button *!/*/}
            {/*                    <div className="header-btn d-inline-flex">*/}
            {/*                        <Link*/}
            {/*                            to="/"*/}
            {/*                            className="btn btn-danger btn-lg"*/}
            {/*                            style={{ borderRadius: "50px", backgroundColor: "red" }}*/}
            {/*                        >*/}
            {/*                            ← Back*/}
            {/*                        </Link>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="navbar-toggle"></div>*/}
            {/*            </div>*/}
            {/*        </nav>*/}
            {/*        <div className="responsive-menu"></div>*/}
            {/*    </div>*/}
            {/*</header>*/}


            <header className="site-header header-style-1 mobile-sider-drawer-menu light-hdr ">
                <div className="header-middle-wraper sticky-header">
                    <div className="header-middle main-bar">
                        <div className="logo-header">
                            <div className="logo-header-inner logo-header-one">
                                <Link to="">
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
                                                    <li><Link to="/dealer/dashboard">Home</Link>

                                                    </li>
                                                    <li>
                                                        <Link to="/dealer/manage_vehicle">Manage
                                                            Vehicle</Link>
                                                    </li>

                                                    <li className="has-child">
                                                        <Link >Booking Request</Link>
                                                        <ul className="sub-menu">
                                                            <li >
                                                                <Link
                                                                      to="/dealer/manage_booking_req">Pending
                                                                    Requests</Link>
                                                            </li>
                                                            <li >
                                                                <Link
                                                                      to="/dealer/view_approved_req">Approved
                                                                    Requests</Link>
                                                            </li>
                                                            <li >
                                                                <Link
                                                                      to="/dealer/view_completed_req">Completed
                                                                    Requests</Link>
                                                            </li>
                                                            <li >
                                                                <Link
                                                                      to="/dealer/view_cancelled_req">Cancelled
                                                                    Requests</Link>
                                                            </li>
                                                        </ul>
                                                    </li>


                                                    <li className="has-child">
                                                        <Link to="">Settings</Link>
                                                        <ul className="sub-menu">
                                                            <li>
                                                                <Link to="/dealer/changePassword">Change
                                                                    Password</Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    to="/dealer/profile">Profile</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/dealer/logout"
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
    );
}

export default DealerNavbar;
