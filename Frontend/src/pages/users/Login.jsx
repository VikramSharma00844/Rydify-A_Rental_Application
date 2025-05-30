import { useForm } from "react-hook-form";
import axios from "axios";
import { server_url } from "../../utils/script.jsx";
import { toast } from "react-toastify";
import { useNavigate , Link } from "react-router-dom";
import Style from "../../utils/Card.module.css"
import React from "react";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const url = `${server_url}/user/login`;
            const response = await axios.post(url, data);

            const { error, message, token } = response.data;

            if (error) {
                toast.error(message);
            } else {
                reset();
                toast.success(message);

                let duration = 86400; // 1 day
                document.cookie = `userToken=${token}; path=/; max-age=${duration}`;

                setTimeout(() => {
                    navigate("/user/dashboard");
                }, 2000);
            }
        } catch (err) {
            console.error(err.message);
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <div className={`container-fluid card col-md-6 mb-3 ${Style.card}`}>
            <h4 align="center" style={{ color: "black", fontWeight:'bold' }}>Login User</h4>
            <hr />
            <div className="log-in-area white-bg ptb-70 small-ptb-30">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="form-single form-single-right">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            {...register("email", {required: "Enter Your Email"})}
                                            className="form-control"
                                            placeholder="Enter Email"
                                        />
                                        {errors.email && (
                                            <span className="text-danger">{errors.email.message}</span>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            {...register("password", {required: "Enter Your Password"})}
                                            className="form-control"
                                            placeholder="Enter Password"
                                        />
                                        {errors.password && (
                                            <span className="text-danger">{errors.password.message}</span>
                                        )}
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
                                        <i className="fa fa-lock" aria-hidden="true"></i> Sign in
                                    </button>

                                    <div className="mb-3">
                                        <Link to="/user-signup">Not Registered? Go To Register Page</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
