import React, { useEffect, useState } from 'react';
import { server_url, getCookie } from "../../utils/script.jsx";

const Dashboard = () => {
    const [dealerCount, setDealerCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);
    const token = getCookie('adminToken');

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            const categoryRes = await fetch(`${server_url}/admin/viewcategory`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const categoryData = await categoryRes.json();
            setCategoryCount(categoryData.records.length);

            const dealerRes = await fetch(`${server_url}/admin/fetchDealers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const dealerData = await dealerRes.json();
            setDealerCount(dealerData.records.length);

            const bookingRes = await fetch(`${server_url}/admin/fetchbooking`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const bookingData = await bookingRes.json();
            setBookingCount(bookingData.records.length);
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard" style={{textAlign: 'center', width: '90%', maxWidth: '1200px', margin: 'auto'}}>
            <h1 style={{
                fontSize: '4rem', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '3px',
               color:'black'
            }}>
                Admin Dashboard
            </h1>
            <div className="cards"
                 style={{display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '40px'}}>
                <div
                    className="card"
                    style={{
                        flex: 1,
                        background: 'linear-gradient(145deg, #ff6b00, #cc5500)',
                        boxShadow: '0 10px 20px rgba(255, 107, 0, 0.5)',
                        padding: '40px',
                        borderRadius: '20px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        color: 'white',
                    }}
                >
                    <h2>Total Dealers</h2>
                    <p
                        className="stat"
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '2px 2px 10px rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        {dealerCount}
                    </p>
                </div>

                <div
                    className="card"
                    style={{
                        flex: 1,
                        background: 'linear-gradient(145deg, #ff6b00, #cc5500)',
                        boxShadow: '0 10px 20px rgba(255, 107, 0, 0.5)',
                        padding: '40px',
                        borderRadius: '20px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        color: 'white',
                    }}
                >
                    <h2>Total Categories</h2>
                    <p
                        className="stat"
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '2px 2px 10px rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        {categoryCount}
                    </p>
                </div>

                <div
                    className="card"
                    style={{
                        flex: 1,
                        background: 'linear-gradient(145deg, #ff6b00, #cc5500)',
                        boxShadow: '0 10px 20px rgba(255, 107, 0, 0.5)',
                        padding: '40px',
                        borderRadius: '20px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        color: 'white',
                    }}
                >
                    <h2>Total Bookings</h2>
                    <p
                        className="stat"
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '2px 2px 10px rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        {bookingCount}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
