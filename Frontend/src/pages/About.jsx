import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {server_url} from "../utils/script.jsx";
import axios from "axios";

function About()
{
    const [reviews, setReviews] = useState([]);
    async function fetchReviews() {
        try {
            let url=`${server_url}/fetchreviews`
            const response = await axios.get(url);
            const result =  response.data;
            console.log(result.records);
            setReviews(result.records);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }
    useEffect(() => {

        fetchReviews();
    }, []); // Empty dependency array means this will run once when the component mounts

    return (
        <>

            <div
                className="wt-bnr-inr site-bg-dark twm-primary-overlay-wrap"
                style={{backgroundImage: 'url(/images2/banner/banner-10.jpg)'}}
            >
                <div className="twm-primary-overlay"></div>
                <div className="container">
                    <div className="wt-bnr-inr-entry">
                        <div className="banner-title-outer">
                            <div className="banner-title-name">
                                <h2 className="wt-title">About us</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="section-full p-t150 p-b120 site-bg-white twm-w-range-section-wrap wow fadeInDown"
                data-wow-offset="100"
                data-wow-delay="0.2"
            >
                <div className="container">
                    {/* TITLE START */}
                    <div className="section-head center">
                        <div className="twm-sm-title left">Find your car by car brand</div>
                        <h2 className="twm-large-title site-text-dark">
                            Wide Range Of Commercial <br/>
                            And Luxury Cars
                        </h2>
                    </div>
                    {/* TITLE END */}

                    <div className="section-content">
                        <div className="row twm-w-range-section">
                            {/* One block */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="twm-cntr-with-icon">
                                    <div className="icon-media">
                                        <img src="images2/icons/rental.png" alt="Rental Icon"/>
                                    </div>
                                    <span className="counter">4500</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Client Served</h3>
                                </div>
                            </div>

                            {/* Two block */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="twm-cntr-with-icon">
                                    <div className="icon-media">
                                        <img src="images2/icons/man.png" alt="Man Icon"/>
                                    </div>
                                    <span className="counter">2750</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Happy Customers</h3>
                                </div>
                            </div>

                            {/* Three block */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="twm-cntr-with-icon">
                                    <div className="icon-media">
                                        <img src="images2/icons/car-insurance.png" alt="Car Insurance Icon"/>
                                    </div>
                                    <span className="counter">600</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Vehicle In Stock Cars</h3>
                                </div>
                            </div>

                            {/* Four block */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="twm-cntr-with-icon">
                                    <div className="icon-media">
                                        <img src="images2/icons/work-time.png" alt="Work Time Icon"/>
                                    </div>
                                    <span className="counter">12</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Years Experience</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="section-full site-bg-light twm-how-it-work-wrap wow fadeInDown"
                data-wow-offset="100"
                data-wow-delay="0.2"
            >
                <div className="section-content">
                    <div className="twm-how-it-work-section container-fluid">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="twm-how-it-work-media">
                                    <img src="/images2/h-it-work.jpg" alt="How It Works"/>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="twm-how-it-work-content">
                                    {/* TITLE START */}
                                    <div className="section-head left">
                                        <div className="twm-sm-title left">How It Work</div>
                                        <h2 className="twm-large-title site-text-dark">Following Working Steps</h2>
                                    </div>
                                    {/* TITLE END */}
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="twm-w-steps-st2">
                                                <div className="twm-w-step-count">
                                                    <span>01</span>
                                                </div>
                                                <div className="twm-w-step-detail">
                                                    <h3 className="twm-title">Choose A Car</h3>
                                                    <p>Check out our range of cars and choose the car of your
                                                        choice </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="twm-w-steps-st2">
                                                <div className="twm-w-step-count">
                                                    <span>02</span>
                                                </div>
                                                <div className="twm-w-step-detail">
                                                    <h3 className="twm-title">Pick Up Date</h3>
                                                    <p>Choose the date, time, and location for picking up your vehicle to match your schedule. </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="twm-w-steps-st2">
                                                <div className="twm-w-step-count">
                                                    <span>03</span>
                                                </div>
                                                <div className="twm-w-step-detail">
                                                    <h3 className="twm-title">Confirm Your Booking</h3>
                                                    <p>Confirm booking information related to your car </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="twm-w-steps-st2">
                                                <div className="twm-w-step-count">
                                                    <span>04</span>
                                                </div>
                                                <div className="twm-w-step-detail">
                                                    <h3 className="twm-title">Enjoy Driving</h3>
                                                    <p>After confirmation, get the car keys and enjoy your car</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="section-full site-bg-light twm-abus-section-wrap wow fadeInDown"
                data-wow-offset="100"
                data-wow-delay="0.2"
            >
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="twm-abus-st2-section">
                            {/* TITLE START */}
                            <div className="section-head left">
                                <div className="twm-sm-title left">About Us</div>
                                <h2 className="twm-large-title site-text-dark">
                                    We Have Many Provided <br/>
                                    Assistance To People And <br/>
                                    Companies In This Field
                                </h2>
                                <div className="section-head-detail">
                                    I must explain to you how all this mistaken idea of denouncing pleasure{" "}
                                    and praising pain was born and I will give you a complete account of the{" "}
                                    system, and expound the actual teachings of the great explorer of the{" "}
                                    truth, the master-builder of human happiness. No one rejects, dislikes,{" "}
                                    or avoids pleasure itself, because it is pleasure,
                                </div>
                            </div>
                            {/* TITLE END */}
                            <div className="twm-inline-list2">
                                <ul>
                                    <li>All Type Vehicle Available</li>
                                    <li>You Get 24/7 Roadside Assistance</li>
                                    <li>We Are The Punjab's Largest Provider</li>
                                </ul>
                            </div>
                            <div className="twm-btn-left">
                                <a href="about-us.html" className="site-button">
                                    <em>Read More</em>
                                </a>
                            </div>
                            <div className="twm-abus2-left">
                                <div className="twm-abus-video">
                                    <a href="https://vimeo.com/337649532" className="mfp-video">
                                        <i className="icon fa fa-play"></i>
                                    </a>
                                </div>
                                <div className="twm-abus2-year-section">
                                    <div className="tem-abus-year-content">
                                        <span>Since</span>
                                        <h2 className="year-title">2016</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-lg-6 col-md-12 twm-abus2-right-pic"
                        style={{backgroundImage: "url(images/ab-us.jpg)"}}
                    >
                        <div className="abus2-right-pic">
                            <h2 className="twm-title">For Rental</h2>
                        </div>
                    </div>
                </div>
            </div>


            {/*    reviews*/}
            <div className="our-testimonial" style={{backgroundColor: '#fff', padding: '40px 0'}}>
                <div className="container">
                    <div className="row section-row">
                        <div className="col-lg-12">
                            <div className="section-title" style={{marginBottom: '40px'}}>
                                <h2
                                    className="text-anime-style-3"
                                    data-cursor="-opaque"
                                    style={{color: 'orangered', fontWeight: '700', textAlign: 'center'}}
                                >
                                    Vehicle Reviews
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-12">
                            <div className="testimonial-slider">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={20}
                                    pagination={{clickable: true}}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Navigation, Pagination, Autoplay]}
                                    className="row"
                                >
                                    {reviews.map((review, index) => (
                                        <SwiperSlide key={index} className="col col-md-3" style={{padding: '0 15px'}}>
                                            <div
                                                className="testimonial-item"
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 4px 15px rgba(255, 69, 0, 0.2)', // subtle orange shadow
                                                    padding: '25px',
                                                    color: '#333',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <div className="testimonial-header" style={{marginBottom: '15px'}}>
                                                    <div className="testimonial-rating"
                                                         style={{color: 'orangered', marginBottom: '10px'}}>
                                                        {Array.from({length: review.rating}).map((_, i) => (
                                                            <i key={`star-${i}`} className="fa-solid fa-star"/>
                                                        ))}
                                                        {Array.from({length: 5 - review.rating}).map((_, i) => (
                                                            <i key={`empty-star-${i}`} className="fa-regular fa-star"
                                                               style={{color: '#ccc'}}/>
                                                        ))}
                                                    </div>
                                                    <div className="testimonial-content">
                                                        <h5 style={{color: 'orangered', marginBottom: '5px'}}>
                                                            {`${review.user.first_name} ${review.user.last_name}`}
                                                        </h5>
                                                        <p style={{
                                                            fontStyle: 'italic',
                                                            color: '#666'
                                                        }}>{review.feedback}</p>
                                                    </div>
                                                </div>
                                                <div className="testimonial-body"
                                                     style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                                    <div className="author-image" style={{flexShrink: 0}}>
                                                        <figure className="image-anime" style={{margin: 0}}>
                                                            <img
                                                                src={review.vehicle.car_photo}
                                                                alt="Vehicle"
                                                                style={{
                                                                    width: '80px',
                                                                    height: '80px',
                                                                    borderRadius: '15px',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        </figure>
                                                    </div>
                                                    <div className="author-content">
                                                        <h3 style={{
                                                            margin: 0,
                                                            color: 'orangered'
                                                        }}>{review.vehicle.name}</h3>
                                                        <p style={{
                                                            margin: 0,
                                                            color: '#999'
                                                        }}>{review.vehicle.vehicle_model}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default About;
