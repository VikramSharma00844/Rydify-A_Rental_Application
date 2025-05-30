import {Link, useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {checkdealer,checkuser,fetchCategoryFilter} from "../utils/script.jsx";
import{useEffect} from "react";


function UserNavbar() {
    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();
        document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // clear cookie
        navigate('/user-login');
    }

    useEffect(() => {
        fetchCategoryFilter();
    }, []);
    return (
        <>

            {/* Header */}
            {/*<header className="main-header">*/}
            {/*    <div className="header-sticky">*/}
            {/*        <nav className="navbar navbar-expand-lg">*/}
            {/*            <div className="container">*/}
            {/*                /!* Logo *!/*/}
            {/*                <Link className="navbar-brand" to="/user/dashboard">*/}
            {/*                    <img src="/images/logo.svg" alt="Logo" />*/}
            {/*                </Link>*/}

            {/*                /!* Main Menu *!/*/}
            {/*                <div className="collapse navbar-collapse main-menu">*/}
            {/*                    <div className="nav-menu-wrapper">*/}
            {/*                        <ul className="navbar-nav mr-auto" id="menu">*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/user/dashboard">*/}
            {/*                                    Dashboard*/}
            {/*                                </Link>*/}
            {/*                            </li>*/}

            {/*                            <li className="nav-item submenu">*/}
            {/*                                <Link className="nav-link" to={""}>Rent Vehicle</Link>*/}
            {/*                                <ul id="vehicles">/!* Dynamic list *!/</ul>*/}
            {/*                            </li>*/}

            {/*                            <li className="nav-item submenu">*/}
            {/*                                <Link className="nav-link" to={""}>Settings</Link>*/}
            {/*                                <ul>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/user/changePassword">Change Password</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/user/profile">Profile</Link>*/}
            {/*                                    </li>*/}
            {/*                                    <li className="nav-item">*/}
            {/*                                        <Link className="nav-link" to="/user/logout" onClick={handleLogout}>Logout</Link>*/}
            {/*                                    </li>*/}
            {/*                                </ul>*/}
            {/*                            </li>*/}
            {/*                        </ul>*/}
            {/*                    </div>*/}

            {/*                    /!* My Bookings Button *!/*/}
            {/*                    <div className="header-btn d-inline-flex">*/}
            {/*                        <Link to="/user/mybooking" className="btn-default">*/}
            {/*                            My Bookings*/}
            {/*                        </Link>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                /!* Navbar Toggle for mobile *!/*/}
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
                                                    <li><Link to="/user/dashboard">Home</Link>

                                                    </li>


                                                    <li className="has-child">
                                                        <Link to="">Rent Vehicle</Link>
                                                        <ul className="sub-menu" id="vehicles">

                                                        </ul>
                                                    </li>

                                                    <li className="has-child">
                                                        <Link to="">Settings</Link>
                                                        <ul className="sub-menu">
                                                            <li >
                                                                <Link to="/user/changePassword">Change
                                                                    Password</Link>
                                                            </li>
                                                            <li >
                                                                <Link
                                                                      to="/user/profile">Profile</Link>
                                                            </li>
                                                            <li >
                                                                <Link  to="/user/logout"
                                                                      onClick={handleLogout}>Logout</Link>
                                                            </li>
                                                        </ul>
                                                    </li>


                                                    <li>
                                                        <Link
                                                            to="/user/mybooking"
                                                            style={{
                                                                marginTop: "30px",
                                                                display: "inline-block",
                                                                backgroundColor: "#f37c19",
                                                                color: "#fff",
                                                                padding: "10px 20px",
                                                                borderRadius: "25px",
                                                                textDecoration: "none",
                                                                fontWeight: "bold",
                                                                fontSize: "16px",
                                                            }}
                                                        >
                                                            My Bookings
                                                        </Link>
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

export default UserNavbar;