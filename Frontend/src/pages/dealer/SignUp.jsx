import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { server_url ,getCookie} from '../../utils/script.jsx';
import { toast } from 'react-toastify';
import { useNavigate ,Link} from 'react-router-dom';
const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {

    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('adhar_card', data.aadhaar_card);
            formData.append('pan_card', data.pan_card);
            formData.append('mobile', data.mobile);
            formData.append('gender', data.gender);
            formData.append('photo', data.photo[0]);
            formData.append('address', data.address);
            formData.append('city', data.city);

            const res = await axios.post(`${server_url}/dealer/register`, formData);

            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                reset();
                setTimeout(() => {
                    navigate('/dealer-login');
                }, 1000);
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                maxWidth: '700px',
                margin: '30px auto'
            }}
        >
            <h4 style={{ textAlign: 'center', color: 'black', fontWeight:'bold' }}>Register Dealer</h4>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        {...register('name', {required: 'Please enter your full name'})}
                        className="form-control"
                        placeholder="Enter Full Name"
                    />
                    {errors.name && <div style={{color: 'red'}}>{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email', {required: 'Enter your email'})}
                        className="form-control"
                        placeholder="Enter Email"
                    />
                    {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', {required: 'Enter your password'})}
                        className="form-control"
                        placeholder="Enter Password"
                    />
                    {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Aadhaar Card</label>
                    <input
                        type="text"
                        {...register('aadhaar_card', {required: 'Enter your Aadhaar number'})}
                        className="form-control"
                        placeholder="Enter Aadhaar Card Number"
                    />
                    {errors.aadhaar_card && <div style={{color: 'red'}}>{errors.aadhaar_card.message}</div>}
                </div>

                <div className="mb-3">
                    <label>PAN Card</label>
                    <input
                        type="text"
                        {...register('pan_card', {required: 'Enter your PAN card number'})}
                        className="form-control"
                        placeholder="Enter PAN Card Number"
                    />
                    {errors.pan_card && <div style={{color: 'red'}}>{errors.pan_card.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Mobile No.</label>
                    <input
                        type="text"
                        {...register('mobile', {required: 'Enter your mobile number'})}
                        className="form-control"
                        placeholder="Enter Mobile Number"
                    />
                    {errors.mobile && <div style={{color: 'red'}}>{errors.mobile.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Gender</label>
                    <select
                        {...register('gender', {required: 'Select your gender'})}
                        className="form-select"
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#333',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23333' d='M2 0L0 2h4z'/></svg>")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                            backgroundSize: '10px',
                            paddingRight: '30px',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <div style={{color: 'red'}}>{errors.gender.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Profile Photo</label>
                    <input
                        type="file"
                        {...register('photo', {required: 'Upload your profile photo'})}
                        className="form-control"
                    />
                    {errors.photo && <div style={{color: 'red'}}>{errors.photo.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Address</label>
                    <input
                        type="text"
                        {...register('address', {required: 'Enter your address'})}
                        className="form-control"
                        placeholder="Enter Address"
                    />
                    {errors.address && <div style={{color: 'red'}}>{errors.address.message}</div>}
                </div>

                <div className="mb-3">
                    <label>City</label>
                    <input
                        type="text"
                        {...register('city', {required: 'Enter your city'})}
                        className="form-control"
                        placeholder="Enter City"
                    />
                    {errors.city && <div style={{color: 'red'}}>{errors.city.message}</div>}
                </div>


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
                    <i className="fa fa-lock" aria-hidden="true"></i> Sign Up
                </button>

                <div className="mt-3 text-center">
                    <Link to="/dealer-login">Already Registered? Go To Login Page</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
