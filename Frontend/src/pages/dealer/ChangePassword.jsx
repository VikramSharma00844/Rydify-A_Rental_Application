import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {server_url, getCookie} from "../../utils/script.jsx";
import Style from "../../utils/Card.module.css";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const token = getCookie('dealerToken');
    const onSubmit = async (data) => {
        try {

            const response = await axios.put(`${server_url}/dealer/changePassword`, {
                    password: data.old_password,
                    new_password: data.new_password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                reset();
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div
            className="container mt-5 mb-5 d-flex justify-content-center"
            style={{
                backgroundColor: '#fffaf5',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 0 15px rgba(0,0,0,0.1)'
            }}
        >
            <div className="w-100" style={{maxWidth: '500px'}}>
                <h4 className="text-center mb-3" style={{color: '#ff6b00'}}>Change Password</h4>
                <hr style={{borderTop: '2px solid #ffa94d'}}/>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="old_password" className="form-label text-dark fw-semibold">Old Password</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            {...register('old_password', {required: 'Old password is required'})}
                            placeholder="Enter your old password"
                        />
                        {errors.old_password && (
                            <span className="text-danger">{errors.old_password.message}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="new_password" className="form-label text-dark fw-semibold">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            {...register('new_password', {required: 'New password is required'})}
                            placeholder="Enter your new password"
                        />
                        {errors.new_password && (
                            <span className="text-danger">{errors.new_password.message}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirm_password" className="form-label text-dark fw-semibold">Confirm
                            Password</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{borderColor: '#ffa94d', borderRadius: '8px'}}
                            {...register('confirm_password', {required: 'Confirm password is required'})}
                            placeholder="Confirm your new password"
                        />
                        {errors.confirm_password && (
                            <span className="text-danger">{errors.confirm_password.message}</span>
                        )}
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn text-white px-4 py-2"
                            style={{
                                backgroundColor: '#ff6b00',
                                border: 'none',
                                borderRadius: '25px',
                                fontWeight: 'bold',
                            }}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
