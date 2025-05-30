import React, { useEffect, useState } from 'react';
import {server_url,getCookie} from '../../utils/script.jsx';

const Dashboard = () => {
    const [stats, setStats] = useState({
        vehicles: 0,
        pending: 0,
        approved: 0,
        completed: 0,
        cancelled: 0,
    });
    const token = getCookie('dealerToken');
    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {


            let res = await fetch(`${server_url}/dealer/fetchMyVehicle`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            let data = await res.json();
            const vehicles = data.records.length;

            res = await fetch(`${server_url}/dealer/fetchbooking`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            data = await res.json();
            const pending = data.records.length;

            res = await fetch(`${server_url}/dealer/fetchapprovedbooking`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            data = await res.json();
            const approved = data.records.length;

            res = await fetch(`${server_url}/dealer/fetchcompletedbooking`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            data = await res.json();
            const completed = data.records.length;

            res = await fetch(`${server_url}/dealer/fetchcancelledbooking`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            data = await res.json();
            const cancelled = data.records.length;

            setStats({ vehicles, pending, approved, completed, cancelled });
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const styles = {
        dashboard: {
            textAlign: 'center',
            width: '90%',
            maxWidth: '1200px',
            margin: 'auto'
        },
        cards: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '40px'
        },
        card: {
            flex: 1,
            minWidth: '200px',
            background: 'linear-gradient(145deg, #ffa500, #cc7000)', // orange gradient
            boxShadow: '0 10px 20px rgba(255, 165, 0, 0.5)', // orange shadow
            padding: '40px',
            borderRadius: '20px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        stat: {
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 10px rgba(255, 255, 255, 0.3)'
        },
        heading: {
            fontSize: '4rem',
            marginBottom: '40px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            background: 'linear-gradient(90deg, orange, #cc7000)', // orange gradient
            WebkitBackgroundClip: 'text',
            color: 'transparent'
        },
        subHeading: {
            marginBottom: '20px',
            fontSize: '1.5rem'
        }
    };


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






            <div className="page-inner">
            <div style={styles.dashboard}>
                <h1 className={"text-black"}>Dealer Dashboard</h1>

                <div style={styles.cards}>
                    <div style={styles.card}>
                        <h2 style={styles.subHeading}>My Vehicles</h2>
                        <p style={styles.stat}>{stats.vehicles}</p>
                    </div>

                    <div style={styles.card}>
                        <h2 style={styles.subHeading}>Pending Requests</h2>
                        <p style={styles.stat}>{stats.pending}</p>
                    </div>

                    <div style={styles.card}>
                        <h2 style={styles.subHeading}>Approved Requests</h2>
                        <p style={styles.stat}>{stats.approved}</p>
                    </div>

                    <div style={styles.card}>
                        <h2 style={styles.subHeading}>Completed Requests</h2>
                        <p style={styles.stat}>{stats.completed}</p>
                    </div>

                    <div style={styles.card}>
                        <h2 style={styles.subHeading}>Cancelled Requests</h2>
                        <p style={styles.stat}>{stats.cancelled}</p>
                    </div>
                </div>
            </div>
        </div>
            </>
    );
};

export default Dashboard;
