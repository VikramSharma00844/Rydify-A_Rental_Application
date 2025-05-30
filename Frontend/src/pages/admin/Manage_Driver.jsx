import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server_url, getCookie } from '../../utils/script.jsx';
import { toast } from 'react-toastify';

const Manage_Driver = () => {
    const [name, setName] = useState('');
    const [dl, setDl] = useState('');
    const [photo, setPhoto] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const token = getCookie('adminToken');

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const res = await axios.get(`${server_url}/admin/viewDriver`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDrivers(res.data.records);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch drivers');
        }
    };

    const handleAddDriver = async () => {
        if (!name || !dl || !photo) {
            toast.error('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('dl', dl);
        formData.append('photo', photo);

        try {
            const res = await axios.post(`${server_url}/admin/add_driver`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success(res.data.message);
            setName('');
            setDl('');
            setPhoto(null);
            fetchDrivers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add driver');
        }
    };

    const handleDeleteDriver = async (id) => {
        try {
            const res = await axios.delete(`${server_url}/admin/delete_driver/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(res.data.message);
            fetchDrivers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete driver');
        }
    };

    return (
        <div>
            <div style={{marginTop: '30px'}} className="container d-flex justify-content-center mb-3">
                <div
                    className="card col-md-6"
                    style={{
                        backgroundColor: '#fffaf5',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 10px 20px rgba(255, 107, 0, 0.15)',
                        border: '2px solid #ffa94d',
                    }}
                >
                    <h2 align="center" style={{color: '#ff6b00', fontWeight: 'bold'}}>Manage Driver</h2>
                    <hr style={{borderTop: '2px solid #ffa94d'}}/>
                    <div className="row justify-content-center">
                        <div className="offset-md-1 col-md-10">
                            <form className="row">
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        style={{
                                            borderColor: '#ffa94d',
                                            borderRadius: '10px',
                                            backgroundColor: '#fff',
                                        }}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label htmlFor="dl" className="form-label fw-semibold">Driving License No</label>
                                    <input
                                        type="text"
                                        id="dl"
                                        className="form-control"
                                        style={{
                                            borderColor: '#ffa94d',
                                            borderRadius: '10px',
                                            backgroundColor: '#fff',
                                        }}
                                        value={dl}
                                        onChange={(e) => setDl(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label htmlFor="photo" className="form-label fw-semibold">Photo</label>
                                    <input
                                        type="file"
                                        id="photo"
                                        className="form-control"
                                        style={{
                                            borderColor: '#ffa94d',
                                            borderRadius: '10px',
                                            backgroundColor: '#fff',
                                        }}
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        required
                                    />
                                </div>

                                <div className="d-grid mt-3">
                                    <button
                                        type="button"
                                        onClick={handleAddDriver}
                                        className="btn"
                                        style={{
                                            backgroundColor: "#000",       // Black background
                                            color: "#fff",                 // White text
                                            border: "none",                // No border
                                            padding: "12px 20px",          // Spacing inside button
                                            borderRadius: "6px",           // Slightly rounded corners
                                            fontWeight: "600",             // Semi-bold text
                                            fontSize: "16px",              // Clear font size
                                            cursor: "pointer",             // Pointer cursor on hover
                                            display: "flex",               // Center icon and text
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "10px",                   // Space between icon and text
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Drivers */}
            <h2 align="center" style={{color: 'orangered', marginTop: '30px'}}>View Driver</h2>
            <hr/>
            <div className="container mt-4">
                <div className="row justify-content-center" id="cards">
                    {drivers.map((x) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={x.id}>
                            <div
                                className="card card-custom card-grey text-white"
                                style={{
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease-in-out',
                                    overflow: 'hidden',
                                    borderRadius: '15px',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0px 0px 25px rgba(255, 0, 0, 0.9)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <img
                                    src={server_url + x.photo}
                                    className="card-img-top"
                                    alt="Driver"
                                    style={{
                                        width: '400px',
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        display: 'block',
                                        margin: '0 auto 10px auto',
                                    }}
                                />
                                <div className="card-body text-black text-center">
                                    <h4 className="text-highlight text-uppercase">{x.name}</h4>
                                    <div>Driving License No: {x.dl}</div>
                                    <div>Status: {x.status}</div>
                                    <div className="offset-2 mt-3 mb-3">
                                        <button
                                            className="btn-default btn-approve"
                                            onClick={() => handleDeleteDriver(x.id)}
                                            style={{
                                                backgroundColor: "#000",       // Black background
                                                color: "#fff",                 // White text
                                                border: "none",                // No border
                                                padding: "12px 20px",          // Spacing inside button
                                                borderRadius: "6px",           // Slightly rounded corners
                                                fontWeight: "600",             // Semi-bold text
                                                fontSize: "16px",              // Clear font size
                                                cursor: "pointer",             // Pointer cursor on hover
                                                display: "flex",               // Center icon and text

                                             marginLeft:'100px',
                                                gap: "10px",                   // Space between icon and text
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Manage_Driver;
