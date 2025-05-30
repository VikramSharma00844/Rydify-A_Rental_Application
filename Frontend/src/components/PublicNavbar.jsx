import {Link} from "react-router-dom";
import {useEffect} from "react";


import {checkdealer, checkuser, fetchCategoryFilter} from "../utils/script.jsx";

function PublicNavbar() {


    useEffect(() => {
        fetchCategoryFilter();
        checkdealer();
        checkuser();
    }, []);
    return (
        <>


            {/* Header Start */}
            {/*<header className="main-header">*/}
            {/*    <div className="header-sticky">*/}
            {/*        <nav className="navbar navbar-expand-lg">*/}
            {/*            <div className="container">*/}
            {/*                /!* Logo Start *!/*/}
            {/*                <Link className="navbar-brand" to="">*/}
            {/*                    <img src="/images/logo.svg" style={{ width: '130px' }} alt="Logo" />*/}
            {/*                </Link>*/}
            {/*                /!* Logo End *!/*/}

            {/*                /!* Main Menu Start *!/*/}
            {/*                <div className="collapse navbar-collapse main-menu">*/}
            {/*                    <div className="nav-menu-wrapper">*/}
            {/*                        <ul className="navbar-nav mr-auto" id="menu">*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/">Home</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/about">About Us</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item">*/}
            {/*                                <Link className="nav-link" to="/contact">Contact Us</Link>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item submenu">*/}
            {/*                                <Link className="nav-link" to="">Rent Vehicle</Link>*/}
            {/*                                <ul id="vehicles"></ul>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item submenu" id="checkdealer">*/}
            {/*                                <Link to="/dealer/dashboard" className="nav-link">Dealer</Link>*/}
            {/*                                <ul>*/}
            {/*                                    <li className="nav-item"><Link className="nav-link"*/}
            {/*                                                                to="/dealer-login">Login</Link></li>*/}
            {/*                                    <li className="nav-item"><Link className="nav-link"*/}
            {/*                                                                to="/dealer-signup">SignUp</Link></li>*/}
            {/*                                </ul>*/}
            {/*                            </li>*/}
            {/*                            <li className="nav-item submenu" id="checkLogin">*/}
            {/*                                <Link className="nav-link" to="/user/dashboard">User</Link>*/}
            {/*                                <ul>*/}
            {/*                                    <li className="nav-item"><Link className="nav-link"*/}
            {/*                                                                to="/user-login">Login</Link></li>*/}
            {/*                                    <li className="nav-item"><Link className="nav-link"*/}
            {/*                                                                to="/user-Signup">SignUp</Link></li>*/}
            {/*                                </ul>*/}
            {/*                            </li>*/}
            {/*                        </ul>*/}
            {/*                    </div>*/}

            {/*                    /!* Let’s Start Button Start *!/*/}
            {/*                    <div className="header-btn d-inline-flex">*/}
            {/*                        <Link to="/vehicles/all" className="btn-default">book a rental</Link>*/}
            {/*                    </div>*/}
            {/*                    /!* Let’s Start Button End *!/*/}
            {/*                </div>*/}
            {/*                /!* Main Menu End *!/*/}
            {/*                <div className="navbar-toggle"></div>*/}
            {/*            </div>*/}
            {/*        </nav>*/}
            {/*        <div className="responsive-menu"></div>*/}
            {/*    </div>*/}
            {/*</header>*/}
            {/* Header End */}


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
                                                    <li><Link to="/">Home</Link>

                                                    </li>


                                                    <li><Link to="/about">About</Link></li>
                                                    <li><Link to="/contact">Contact Us</Link></li>
                                                    <li className="has-child">
                                                        <Link to="">Rent Vehicle</Link>
                                                        <ul className="sub-menu" id="vehicles">

                                                        </ul>
                                                    </li>
                                                    <li className="has-child" id="checkdealer">
                                                        <Link to="/dealer/dashboard">Dealer</Link>
                                                        <ul className="sub-menu">

                                                            <li><Link to="/dealer-login">Login</Link></li>

                                                            <li><Link to="/dealer-signup">Signup</Link></li>


                                                        </ul>
                                                    </li>
                                                    <li className="has-child" id="checkLogin">
                                                        <Link to="/user/dashboard">User</Link>
                                                        <ul className="sub-menu">

                                                            <li><Link to="/user-login">Login</Link></li>

                                                            <li><Link to="/user-signup">Signup</Link></li>


                                                        </ul>
                                                    </li>


                                                    <li>
                                                        <Link
                                                            to="/vehicles/all"
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
                                                            Book Rental
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
    );
}

export default PublicNavbar;
