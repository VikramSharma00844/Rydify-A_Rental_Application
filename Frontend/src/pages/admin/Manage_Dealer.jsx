import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server_url, getCookie } from '../../utils/script.jsx';

const Manage_Dealer = () => {
    const [dealers, setDealers] = useState([]);
    const token = getCookie('adminToken');

    useEffect(() => {
        fetchDealers();
    }, []);

    const fetchDealers = async () => {
        try {
            const res = await axios.get(`${server_url}/admin/fetchDealers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDealers(res.data.records);
        } catch (error) {
            console.error(error);
        }
    };

    const updateDealers = async (id, status, name, email) => {
        try {
            const res = await axios.put(`${server_url}/admin/update_dealerstatus/${id}`, {
                status
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                const mailStatus = status === 'Active' ? 'Approved' : 'Rejected';
                sendMail(email, name, mailStatus);
                fetchDealers();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const sendMail = async (email, name, status) => {
        try
        {
            // console.log(email,name,status);
            const res = await axios.post(`${server_url}/admin/send-email`, {
                email,
                name,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            res.data.error ? toast.error(res.data.message) : toast.success(res.data.message);
        }
        catch (err)
        {
            console.error(err);
        }
    };

    const deleteDealer = async (id) => {
        try {
            const res = await axios.delete(`${server_url}/admin/delete_dealer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            res.data.error ? toast.error(res.data.message) : toast.success(res.data.message);
            fetchDealers();
        } catch (e) {
            console.error(e);
        }
    };

    const styles = {
        container: {
            marginTop: '1.5rem',
        },
        card: {
            backgroundColor: '#fffaf5',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 8px 20px rgba(255, 107, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease-in-out',
            overflow: 'hidden',
            color: '#333',
            border: '2px solid #ffa94d',
        },
        cardHover: {
            transform: 'scale(1.05)',
            boxShadow: '0 0 25px rgba(255, 107, 0, 0.7)',
        },
        img: {
            width: '200px',
            height: '200px',
            borderRadius: '12px',
            display: 'block',
            margin: '0 auto 15px auto',
            border: '4px solid #ffa94d',
            objectFit: 'cover',
        },
        textHighlight: {
            color: '#ff6b00',
            fontWeight: '600',
        },
        badgeSuccess: {
            backgroundColor: '#ffa94d',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
        },
        badgeDanger: {
            backgroundColor: '#ff6b00',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
        },
        buttonGroup: {
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
        },
        cardColumn: {
            marginBottom: '20px',
        },
    };


    return (
        <div className="container" style={styles.container}>
            <div className="row justify-content-center">
                {dealers.map((x) => (
                    <div key={x.id} className="col-lg-4 col-md-6" style={styles.cardColumn}>
                        <div style={styles.card} className="card card-custom">
                            <img src={server_url+x.photo} alt="Dealer" style={styles.img} className="card-img-top" />
                            <div className="card-body">
                                <h4 style={styles.textHighlight}>{x.name}</h4>
                                <p><span style={styles.textHighlight}>Email:</span> {x.email}</p>
                                <p><span style={styles.textHighlight}>Gender:</span> {x.gender}</p>
                                <p><span style={styles.textHighlight}>Mobile:</span> {x.mobile}</p>
                                <p><span style={styles.textHighlight}>Aadhaar Card:</span> {x.adhar_card}</p>
                                <p><span style={styles.textHighlight}>PAN Card:</span> {x.pan_card}</p>
                                <p><span style={styles.textHighlight}>Address:</span> {x.address}</p>
                                <p><span style={styles.textHighlight}>City:</span> {x.city}</p>

                                <p className="mb-3">
                                    <span style={styles.textHighlight}>Status:</span>{' '}
                                    <span style={x.status === 'Active' ? styles.badgeSuccess : styles.badgeDanger}>
                                        {x.status}
                                    </span>
                                </p>

                                <div style={styles.buttonGroup}>
                                    {x.status === 'Inactive' ? (
                                        <button
                                            className="btn btn-success"
                                            onClick={() => updateDealers(x.id, 'Active', x.name, x.email)}>
                                            Active
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => updateDealers(x.id, 'Inactive', x.name, x.email)}>
                                            Inactive
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteDealer(x.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Manage_Dealer;
