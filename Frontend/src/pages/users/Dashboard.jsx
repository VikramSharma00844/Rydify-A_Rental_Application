import React, { useEffect, useState } from "react";
import styles from "../../utils/UserDashboard.module.css";
import axios from "axios";
import {server_url,getCookie} from "../../utils/script.jsx";
import {Link} from "react-router-dom";

function Dashboard({ name }) {



    const cardStyle = {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        border: '2px solid #000',
        borderRadius: '12px',
        padding: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#fff'
    };

    const cardHoverStyle = {
        transform: 'scale(1.02)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'
    };




    const [carCount, setCarCount] = useState(0);
    async function myBookings() {
        try
        {
            var token=getCookie('userToken');
            var url=`${server_url}/user/fetchMybooking`;
            const res = await axios.get(url,{
                headers: {Authorization:`Bearer ${token}`}
            });
            const data = res.data;
            console.log(data);
            setCarCount(data.records.length);
        }
        catch (error)
        {
            console.error("Error fetching bookings:", error);
        }
    }

    useEffect(() => {
        myBookings();
    }, []);

    return (
        <>
            {/*slider area*/}
            <div className="twm-home-1-banner-wrap">
                <div className="twm-home-1-banner"
                     style={{backgroundImage: "url(/images2/main-slider/slider1/slider1.jpg)"}}>
                    <div className="twm-banner-LR-wrap">
                        <div className="twm-banner-left">
                            <div className="twm-banner-left-info">
                                <div className="twm-banner-left-content">

                                    <div className="twm-sm-title left">Premium</div>
                                    <h2 className="twm-banner-title">
                                        <em className="txt-type" data-wait="3000"
                                            data-words='["The Best Rental", "Wide Range of"]'></em>
                                        Welcome to Rydify – Drive Your Way!
                                    </h2>

                                    

                                </div>
                            </div>
                        </div>
                        <div className="twm-banner-right">
                            <div className="twm-banner-right-section">
                                <div className="twm-banner-r-content">
                                    <div className="twm-banner-r-bx">
                                        <h1 className="twm-bnr-title">Mercedes</h1>
                                        <div className="twm-banner-product-price">
                                            <div className="twm-product-name">Mercedes</div>
                                            <div className="twm-price-section">
                                                <div className="v-price" id="number_notification">$800</div>
                                                <div className="v-duration">/ Day</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="twm-banner-media">
                                    <img src="/images2/main-slider/slider1/car.png" alt="Car Pic"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container">


            <div className={`col-md-4 offset-md-4 mt-3 mb-3 ${styles.dashboard}`}>
                <h1 className={styles.heading} style={{backgroundColor:"orange" , borderRadius:"20px"}}>My Bookings</h1>
                <p className={styles.paragraph}>
                    Total Cars Rented: <span className={styles.stat}>{carCount}</span>
                </p>
                <div className="twm-purchase-btn">
                    <Link
                        to="/user/mybooking"
                        className="site-button"
                        style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            display: 'inline-block',
                            marginTop: '10px'
                        }}
                    >
                        <em>View Bookings</em>
                    </Link>
                </div>
            </div>


        </div>
            </>
    );
}

export default Dashboard;
