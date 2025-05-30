import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie, server_url } from '../../utils/script.jsx';
import Style from '../../utils/Card.module.css';

const Profile = () => {
    const [dealer, setDealer] = useState({
        name: '',
        adhar_card: '',
        pan_card: '',
        email: '',
        mobile: '',
        city: '',
        address: '',
        gender: '',
        id: '',
        photo: '',
    });

    const [editable, setEditable] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        fetchDealerData();
    }, []);

    const fetchDealerData = async () => {
        try {
            const token = getCookie('dealerToken');
            const res = await axios.get(`${server_url}/dealer/showProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDealer(res.data.records[0]);
        } catch (err) {
            toast.error('Failed to load dealer profile.');
        }
    };

    const handleEdit = () => {
        toast.success('Fields changed to Editable');
        setEditable(true);
    };

    const handleChange = (e) => {
        setDealer(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const updateDealerProfile = async () => {
        try {
            const token = getCookie('dealerToken');
            if (photoFile) {
                const formData = new FormData();
                Object.entries(dealer).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append('photo', photoFile);

                const res = await axios.put(`${server_url}/dealer/updateProfile/${dealer.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success(res.data.message);
                setEditable(false);
                setPhotoFile(null);
                fetchDealerData();
            } else {
                const { name, adhar_card, pan_card, mobile, city, address, gender } = dealer;
                const res = await axios.put(`${server_url}/dealer/update_profile/${dealer.id}`, {
                    name, adhar_card, pan_card, mobile, city, address, gender
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success(res.data.message);
                setEditable(false);
                fetchDealerData();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed.');
        }
    };

    return (
        <div className="page-inner container d-flex justify-content-center">
            <div
                className="profile-container card w-100"
                style={{
                    backgroundColor: '#fffaf5',
                    padding: '40px',
                    margin: '50px auto',
                    maxWidth: '900px',
                    borderRadius: '20px',
                    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                }}
            >
                <h2 className="text-center mb-3" style={{color: '#ff6b00'}}>Dealer Profile Page</h2>
                <hr style={{borderTop: '2px solid #ffa94d'}}/>

                <div className="profile-photo text-center mb-4">
                    <img
                        src={server_url + dealer.photo}
                        crossOrigin="anonymous"
                        alt="Profile"
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            border: '4px solid #ffa94d',
                            objectFit: 'cover',
                        }}
                    />
                </div>

                <form>
                    <div className="row g-3">
                        {editable && (
                            <div className="col-12">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                    style={{borderColor: '#ffa94d', borderRadius: '10px'}}
                                />
                            </div>
                        )}

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={dealer.name}
                                onChange={handleChange}
                                readOnly={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Aadhar No</label>
                            <input
                                type="text"
                                className="form-control"
                                name="adhar_card"
                                value={dealer.adhar_card}
                                onChange={handleChange}
                                readOnly={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Pan No</label>
                            <input
                                type="text"
                                className="form-control"
                                name="pan_card"
                                value={dealer.pan_card}
                                onChange={handleChange}
                                readOnly={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={dealer.email}
                                readOnly
                                style={{
                                    borderColor: '#ffa94d',
                                    borderRadius: '8px',
                                    backgroundColor: '#f8f9fa',
                                }}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Gender</label>
                            <select
                                className="form-select"
                                name="gender"
                                value={dealer.gender}
                                onChange={handleChange}
                                disabled={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Mobile</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="mobile"
                                value={dealer.mobile}
                                onChange={handleChange}
                                readOnly={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={dealer.city}
                                onChange={handleChange}
                                readOnly={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label fw-semibold">Address</label>
                            <textarea
                                className="form-control"
                                name="address"
                                value={dealer.address}
                                onChange={handleChange}
                                rows="3"
                                readOnly={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            ></textarea>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6 d-grid">
                            <button
                                type="button"
                                className="btn"
                                style={{
                                    backgroundColor: '#ff6b00',
                                    color: '#fff',
                                    borderRadius: '30px',
                                    height: '45px',
                                    fontWeight: 'bold',
                                }}
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        </div>
                        <div className="col-md-6 d-grid">
                            <button
                                type="button"
                                className="btn"
                                style={{
                                    backgroundColor: '#ff6b00',
                                    color: '#fff',
                                    borderRadius: '30px',
                                    height: '45px',
                                    fontWeight: 'bold',
                                }}
                                onClick={updateDealerProfile}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Profile;
