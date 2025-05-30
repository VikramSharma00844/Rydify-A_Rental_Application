import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate ,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from '../../utils/UserRegister.module.css';
import {server_url} from "../../utils/script.jsx";

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            formData.append('photo',data.photo[0]);
            let url=`${server_url}/user/register`;
            const response = await axios.post(url, formData);
            const { error, message } = response.data;

            if (error) {
                toast.error(message);
            } else {
                toast.success(message);
                reset();
                setTimeout(() => navigate('/user-login'), 1000);
            }
        } catch (err) {
            toast.error('Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className={`col-md-8 ${styles.card}`}>
                <h4 className={`text-center ${styles.color}`}>Register User</h4>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="mb-3">
                        <label>First Name</label>
                        <input
                            className="form-control" {...register('first_name', {required: 'First name is required'})} />
                        {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Last Name</label>
                        <input
                            className="form-control" {...register('last_name', {required: 'Last name is required'})} />
                        {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email"
                               className="form-control" {...register('email', {required: 'Email is required'})} />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password"
                               className="form-control" {...register('password', {required: 'Password is required'})} />
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input type="password"
                               className="form-control" {...register('confirm_password', {required: 'Confirm your password'})} />
                        {errors.confirm_password && <p className="text-danger">{errors.confirm_password.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Mobile No.</label>
                        <input type="number"
                               className="form-control" {...register('mobile', {required: 'Mobile number is required'})} />
                        {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Gender</label>
                        <select className="form-select" {...register('gender', {required: 'Select your gender'})}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Photo</label>
                        <input type="file"
                               className="form-control" {...register('photo', {required: 'Photo is required'})} />
                        {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>Address</label>
                        <input className="form-control" {...register('address', {required: 'Address is required'})} />
                        {errors.address && <p className="text-danger">{errors.address.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label>City</label>
                        <input className="form-control" {...register('city', {required: 'City is required'})} />
                        {errors.city && <p className="text-danger">{errors.city.message}</p>}
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

                    <div className="mt-2">
                        <Link to="/user-login">Already Registered? Go To Login Page</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
