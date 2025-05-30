import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { server_url, getCookie } from "../../utils/script.jsx";

const cardStyle = {
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const cardBodyStyle = {
    padding: '30px',
    background: 'linear-gradient(145deg, #c5bdbd, #ede8e6)',
    borderRadius: '16px',
    boxShadow: 'inset 0 6px 12px rgba(0, 0, 0, 0.4)',
    animation: 'pulse 1.5s infinite alternate',
};

const Manage_admin = () => {
    const [admins, setAdmins] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState('');
    const token = getCookie('adminToken');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        viewAdmins();
    }, []);

    const generatePassword = (length = 8) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const viewAdmins = async () => {
        try {
            const res = await axios.get(`${server_url}/admin/fetchAlladmin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAdmins(res.data.records);
            setType(res.data.type);
            if (res.data.type === 'Super Admin') setShowForm(true);
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmit = async (data) => {
        try {
            const resCheck = await axios.get(`${server_url}/admin/fetchadmin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (resCheck.data.records[0].type !== 'Super Admin') {
                return toast.error('Only Super Admin Can Add Another Admin');
            }

            const password = generatePassword();

            const res = await axios.post(`${server_url}/admin/addAdmin`, {
                ...data,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                await sendMail(data.name, data.email, password);
                viewAdmins();
                reset(); // Clear form
            }
        } catch (err) {
            console.error(err);
        }
    };

    const sendMail = async (name, email, password) => {
        try {
            const res = await axios.post(`${server_url}/admin/send_email_admin`, {
                name,
                email,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${server_url}/admin/delete_admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                viewAdmins();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ marginTop: '30px' }}>
            {showForm && (
                <div className="container" style={{ ...cardStyle, maxWidth: '600px', marginBottom: '30px' }}>
                    <h4 style={{ textAlign: 'center', color: 'orangered'}}>Add Admin</h4>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label>Full Name</label>
                            <input
                                type="text"
                                {...register("name", {required: "Name is required"})}
                                className="form-control"
                                placeholder="Enter Your Name"
                            />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="form-control"
                                placeholder="Enter Email"
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label>Type</label>
                            <select
                                {...register("type", {required: "Type is required"})}
                                className="form-select"
                                defaultValue="Admin"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Super Admin">Super Admin</option>
                            </select>
                            {errors.type && <span className="text-danger">{errors.type.message}</span>}
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
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
            )}

            <h2 style={{textAlign: 'center', color: 'orangered'}}>View Admin</h2>
            <hr/>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    {admins.map((admin) => (
                        <div key={admin.id} className="col-lg-6 col-md-6 mb-4">
                            <div
                                style={{
                                    backgroundColor: '#fffaf5',
                                    color: '#333',
                                    borderRadius: '20px',
                                    padding: '30px',
                                    boxShadow: '0 8px 20px rgba(255, 107, 0, 0.2)',
                                    border: '2px solid #ffa94d',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                            >
                                <div>
                                    <h5 className="text-center fw-bold" style={{color: '#ff6b00'}}>
                                        Name: {admin.name}
                                    </h5>
                                    <h5 className="text-center">Email: {admin.email}</h5>
                                    <h5 className="text-center">Type: {admin.type}</h5>

                                    {type === 'Super Admin' && (
                                        <div className="text-center mt-3">
                                            <button
                                                className="btn"
                                                style={{
                                                    backgroundColor: '#ff6b00',
                                                    color: '#fff',
                                                    borderRadius: '30px',
                                                    fontWeight: 'bold',
                                                    padding: '10px 25px',
                                                }}
                                                onClick={() => handleDelete(admin.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Manage_admin;
