import {Link} from "react-router-dom"; 
const Footer = () => {

    return (
        <>
            {/*<h1>footer</h1>*/}
            <footer className="footer-dark bg-black">
                <div className="container ">
                    {/* FOOTER BLOCKS START */}
                    <div className="footer-top ">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4">
                                <div className="widget widget_about">
                                    <div className="logo-footer clearfix">
                                        <a href="index-2.html">
                                            <img src="/images2/rydifyLogo.png" alt="Image"/>
                                        </a>
                                    </div>
                                    <div className="f-about-info">
                                        We offer a range of the finest and most premium cars and bikes on rent.
                                    </div>
                                    <ul className="ftr-list">
                                        <li>
                                            <i className="fa-solid fa-phone"></i>
                                            <a href="tel:1236540214">+91 7696995479</a>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-envelope"></i>
                                            rydify@gmail.com
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-house"></i>
                                            55/11 Ranjit Avenue, Amritsar
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>

                            <div className="col-xl-8 col-lg-8">
                                <div className="ftr-right-section">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-6 col-6 m-b10">
                                            <div className="widget widget_time-duraion">
                                                <h3 className="widget-title ms-4">Timings</h3>
                                                <ul>
                                                    <li>
                                                        <span>Monday - Friday:</span>09:00 AM - 09:00 PM
                                                    </li>
                                                    <li>
                                                        <span>Saturday:</span>09:00 AM - 07:00PM
                                                    </li>
                                                    <li>
                                                        <span>Sunday:</span>Closed
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-md-6 col-6 m-b10">
                                            <div className="widget widget_services">
                                                <h3 className="widget-title">Quick Links</h3>
                                                <ul>
                                                    <li>
                                                        <Link to="/about">About us</Link>
                                                    </li>
                                                    {/* <li>
                                                        <a href="faq.html">FAQ’s</a>
                                                    </li> */}
                                                    <li>
                                                        <a href="service.html">Services</a>
                                                    </li>
                                                    {/* <li>
                                                        <a href="team.html">Team</a>
                                                    </li> */}
                                                    <li>
                                                        <Link to="/contact">Contact</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-12 col-sm-12 m-b10">
                                            <div className="widget widget_services">
                                                <h3 className="widget-title">Vehicles Type</h3>
                                                <ul className="gris-2-column">
                                                    <li>
                                                        <a href="cars-detail.html">SUVs</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Sport Coupe</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Convertible</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Wagon</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Sedan</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Yamaha R15</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Scooters</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Kawasaki</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Sports Bike</a>
                                                    </li>
                                                    <li>
                                                        <a href="cars-detail.html">Harley Davidson</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER COPYRIGHT */}
                <div className="footer-bottom">
                    <div className="footer-bottom-info">
                        <div className="footer-copy-right">
            <span className="copyrights-text">
              © 2025 <span className="site-text-primary">Rydify</span> All rights reserved.
            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    );
};

export default Footer;
