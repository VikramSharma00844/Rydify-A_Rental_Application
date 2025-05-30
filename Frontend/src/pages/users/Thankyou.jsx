import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../utils/Thankyou.module.css'

const ThankYouPage = () => {
    return (
        <div className={styles['thank-you-body']}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className={`${styles['thank-you-card']} text-center`}>
                            <div className={styles['thank-you-icon']}>
                                <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <h1 className="mt-3">Thank You!</h1>
                            <p className={styles['thank-you-message']}>
                                Your Vehicle has been Booked successfully. We'll send you a confirmation email shortly.
                            </p>
                            <Link to="/user/dashboard" className={`btn btn-secondary ${styles['thank-you-button']}`}>
                                Go Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ThankYouPage;
