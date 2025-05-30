import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { server_url ,getCookie} from '../../utils/script.jsx';


const Manage_Category = () => {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [categories, setCategories] = useState([]);
    const token=getCookie('adminToken');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            let res = await axios.get(`${server_url}/admin/viewcategory`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            res=res.data;
            // console.log(res.records);
            setCategories(res.records);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load categories');
        }
    };

    const handleAddCategory = async () => {
        if (!name || !photo) {
            toast.error('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('photo', photo);

        try {
            const res = await axios.post(`${server_url}/admin/add_category`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success(res.data.message);
            setName('');
            setPhoto(null);
            fetchCategories();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error adding category');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const res = await axios.delete(`${server_url}/admin/delete_category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success(res.data.message);
            fetchCategories();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete category');
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
                    <h2 align="center" style={{color: '#ff6b00', fontWeight: 'bold'}}>Manage Category</h2>
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
                                        type="submit"
                                        onClick={handleAddCategory}
                                        className="w-100 mt-3 mb-3 btn-default"
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
                                        <i className="fa fa-lock" aria-hidden="true"></i> Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

            {/* View Categories */}
            <h2 align="center" style={{color: 'orangered', marginTop: '30px'}}>View Category</h2>
            <hr/>
            <div className="container mt-4">
                <div className="row justify-content-center" id="cards">
                    {categories.map((cat) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={cat.id}>
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
                                    src={server_url + cat.photo}
                                    alt="Category"
                                    className="card-img-top"
                                    style={{
                                        width: '400px',
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        display: 'block',
                                        margin: '0 auto 10px auto',
                                    }}
                                />
                                <div className="card-body">
                                    <h4 className="text-highlight text-uppercase text-center"
                                        style={{color: "black"}}>{cat.name}</h4>
                                    <div className="offset-4 mt-3 mb-3">
                                        <button

                                            className="w-50 mt-3 mb-3 btn-default"
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

                                                gap: "10px",                   // Space between icon and text
                                            }}
                                            onClick={() => handleDeleteCategory(cat.id)}
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

export default Manage_Category;
