import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {getCookie, server_url} from "../../utils/script.jsx";
import Style from "../../utils/Card.module.css";
const Profile = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
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
        fillData();
    }, []);

    const fillData = async () => {
        try {
            const token = getCookie('userToken');
            let url=`${server_url}/user/showProfile`
            const res = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const record = res.data.records[0];
            setUser(record);
        } catch (err) {
            toast.error('Failed to fetch profile data.');
        }
    };

    const handleEdit = () => {
        toast.success('Fields changed to Editable');
        setEditable(true);
    };

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const updateProfile = async () => {
        try {
            const token = getCookie('userToken');
            if (photoFile) {
                const formData = new FormData();
                formData.append('first_name', user.first_name);
                formData.append('last_name', user.last_name);
                formData.append('mobile', user.mobile);
                formData.append('address', user.address);
                formData.append('city', user.city);
                formData.append('gender', user.gender);
                formData.append('photo', photoFile);

                const res = await axios.put(`${server_url}/user/updateProfile/${user.id}`, formData,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success(res.data.message);
                setEditable(false);
                setPhotoFile(null);
                fillData();
            } else {
                const { first_name, last_name, mobile, city, address, gender } = user;
                const res = await axios.put(`${server_url}/user/update_profile/${user.id}`, {
                    first_name,
                    last_name,
                    mobile,
                    city,
                    address,
                    gender,
                }
                    ,{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                toast.success(res.data.message);
                setEditable(false);
                fillData();
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
                <h2 className="text-center mb-3" style={{color: '#ff6b00'}}>User Profile Page</h2>
                <hr style={{borderTop: '2px solid #ffa94d'}}/>

                <div className="profile-photo text-center mb-4">
                    <img
                        src={server_url + user.photo}
                        crossOrigin="anonymous"
                        alt="Profile"
                        id="profileImage"
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            border: '4px solid #ffa94d',
                            objectFit: 'cover'
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
                            <label className="form-label fw-semibold">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                readOnly={!editable}
                                style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={user.last_name}
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
                                value={user.email}
                                readOnly
                                style={{borderColor: '#ffa94d', borderRadius: '8px', backgroundColor: '#f8f9fa'}}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Gender</label>
                            <select
                                className="form-select"
                                name="gender"
                                value={user.gender}
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
                                value={user.mobile}
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
                                value={user.city}
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
                                value={user.address}
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
                                    fontWeight: 'bold'
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
                                    fontWeight: 'bold'
                                }}
                                onClick={updateProfile}
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
