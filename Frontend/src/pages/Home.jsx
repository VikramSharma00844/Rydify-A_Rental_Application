import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import OwlCarousel from 'react-owl-carousel';

import { Accordion, AccordionItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {server_url} from "../utils/script.jsx";

function Home() {

    const clientLogos = [
        "w1.png", "w2.png", "w3.png", "w4.png", "w5.png", "w6.png", "w1.png", "w2.png", "w3.png", "w5.png"
    ];

    const [visibleCount, setVisibleCount] = useState(3);

    const handleViewMore = () => {
        setVisibleCount(reviews.length); // show all reviews
    };



    const slides = [
        {
            image: '/images/bike.jpg',
            heading: 'Looking to save more on your rental Vehicle?',
        },
        {
            image: '/images/hero-bg-2.jpg',
            heading: 'Looking to save more on your rental Vehicle?',
        },
        {
            image: '/images/hero-bg-3.jpg',
            heading: 'Looking to save more on your rental Vehicle?',
        },
    ];

    const [reviews, setReviews] = useState([]);

    async function fetchReviews() {
        try {
            let url=`${server_url}/fetchreviews`
            const response = await axios.get(url);
            const result =  response.data;
            // console.log(result.records);
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
            {/*slider area*/}
            <div className="twm-home-1-banner-wrap">
                <div className="twm-home-1-banner"
                     style={{backgroundImage: "url(/images2/main-slider/slider1/slider1.jpg)"}}>
                    <div className="twm-banner-LR-wrap">
                        <div className="twm-banner-left">
                            <div className="twm-banner-left-info">
                                <div className="twm-banner-left-content">

                                    <div className="twm-sm-title left">Premium</div>
                                    <h2 className="twm-banner-title">
                                        <em className="txt-type" data-wait="3000"
                                            data-words='["The Best Rental", "Wide Range of"]'></em>
                                        Welcome to Rydify – Drive Your Way!
                                    </h2>

                                    

                                </div>
                            </div>
                        </div>
                        <div className="twm-banner-right">
                            <div className="twm-banner-right-section">
                                <div className="twm-banner-r-content">
                                    <div className="twm-banner-r-bx">
                                        <h1 className="twm-bnr-title">Mercedes</h1>
                                        <div className="twm-banner-product-price">
                                            <div className="twm-product-name">Mercedes</div>
                                            <div className="twm-price-section">
                                                <div className="v-price" id="number_notification">$800</div>
                                                <div className="v-duration">/ Day</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="twm-banner-media">
                                    <img src="/images2/main-slider/slider1/car.png" alt="Car Pic"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*nxt*/}
            <div className="section-full p-t150 p-b120 site-bg-white twm-w-range-section-wrap wow fadeInDown"
                 data-wow-offset="100" data-wow-delay="0.2s">
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
                                        <img src="/images2/icons/rental.png" alt="Client Served"/>
                                    </div>
                                    <span className="counter">4500</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Client Served</h3>
                                </div>
                            </div>

                            {/* Two block */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="twm-cntr-with-icon">
                                    <div className="icon-media">
                                        <img src="/images2/icons/man.png" alt="Happy Customers"/>
                                    </div>
                                    <span className="counter">2750</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Happy Customers</h3>
                                </div>
                            </div>

                            {/* Three block */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="twm-cntr-with-icon">
                                    <div className="icon-media">
                                        <img src="/images2/icons/car-insurance.png" alt="Vehicle In Stock Cars"/>
                                    </div>
                                    <span className="counter">600</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Vehicle In Stock Cars</h3>
                                </div>
                            </div>

                            {/* Four block */}
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="twm-cntr-with-icon">
                                    <div className="icon-media">
                                        <img src="/images2/icons/work-time.png" alt="Years Experience"/>
                                    </div>
                                    <span className="counter">12</span> <em className="symble">+</em>
                                    <h3 className="icon-content-info">Years Experience</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*nxt*/}
            <div className="section-full twm-explore-section-wrap site-bg-primary">
                <div className="container">
                    <div className="row">
                        {/* Title Section */}
                        <div className="col-xl-4 col-lg-12">
                            <div className="section-head left">
                                <div className="twm-sm-title left site-text-white">Car Brands</div>
                                <h2 className="twm-large-title site-text-white">Explore Our Premium Brands</h2>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="col-xl-6 col-lg-12">
                            <div className="twm-mid-section-car">
                                <div className="twm-media">
                                    <img src="/images2/explore-sec-image.png" alt="Explore Premium Brands"/>
                                </div>
                            </div>
                        </div>

                        {/* Button Section */}
                        <div className="col-xl-2 col-lg-12">
                            <div className="twm-mid-section-btn">
                                <a href="cars-grid-4.html" className="site-button">
                                    <em>View All Brands</em>
                                </a>
                                {/* If using React Router: */}
                                {/* <Link to="/cars-grid-4" className="site-button"><em>View All Brands</em></Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*nxt*/}
            <div className="twm-client-slider1-wrap site-bg-white">
                <div className="twm-client-slider1">
                    <OwlCarousel
                        className="owl-theme home-client-carousel3 owl-btn-vertical-center"
                        loop
                        margin={10}
                        nav={false}
                        autoplay
                        autoplayTimeout={2000}
                        responsive={{
                            0: {items: 2},
                            600: {items: 4},
                            1000: {items: 6}
                        }}
                    >
                        {clientLogos.map((logo, index) => (
                            <div className="item" key={index}>
                                <div className="ow-client-logo">
                                    <div className="client-logo client-logo-media">
                                        <a href="cars-grid-4.html">
                                            <img src={`/images2/client-logo/dark/${logo}`}
                                                 alt={`Client logo ${index + 1}`}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>

            {/*about*/}
            <div className="section-full site-bg-white p-t150 p-b120 twm-abus-section-wrap wow fadeInDown"
                 data-wow-offset="100" data-wow-delay="0.2">
                <div className="container">
                    <div className="row twm-abus-section">

                        <div className="col-lg-7 col-md-12">
                            <div className="twm-abus-left">
                                <div className="twm-media">
                                    <img src="/images2/abus-pic.jpg" alt="About Us"/>
                                    <div className="twm-abus-video">
                                        <a href="https://vimeo.com/337649532" className="mfp-video">
                                            <i className="icon fa fa-play"></i>
                                        </a>
                                    </div>
                                    <div className="twm-abus-year-section">
                                        <div className="tem-abus-year-content">
                                            <span>Since</span>
                                            <h2 className="year-title">2016</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="twm-media2">
                                    <img src="/images2/car-pic1.png" alt="Car"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-12">
                            <div className="section-head left aside-section">
                                <div className="twm-sm-title left">About Us</div>
                                <h2 className="twm-large-title site-text-dark">
                                    We Have Many Provided<br/>
                                    Assistance To People And<br/>
                                    Companies In This Field
                                </h2>
                                <div className="section-head-detail">
                                    I must explain to you how all this mistaken idea of denouncing pleasure
                                    and praising pain was born and I will give you a complete account of the
                                    system, and expound the actual teachings of the great explorer of the
                                    truth, the master-builder of human happiness. No one rejects, dislikes,
                                    or avoids pleasure itself, because it is pleasure,
                                </div>
                            </div>

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

                        </div>
                    </div>
                </div>
            </div>

            {/*reviews*/}
            <div
                className="testimonial-container"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {reviews.slice(0, visibleCount).map((review, index) => (
                    <div
                        className="item"
                        key={index}
                        style={{
                            padding: "10px",
                            boxSizing: "border-box",
                            flex: "1 1 calc(33.333% - 20px)",
                            maxWidth: "calc(33.333% - 20px)",
                            minWidth: "250px",
                        }}
                    >
                        <div
                            className="twm-testimonial2"
                            style={{
                                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                padding: "20px",
                                borderRadius: "50px",
                                background: "#fff",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                className="twm-testimonial-head"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "15px",
                                }}
                            >
                                <div className="media-pic" style={{ marginRight: "15px" }}>
                                    <img
                                        src={server_url + review.vehicle.car_photo}
                                        alt="car_photo"
                                        style={{
                                            width: "80px",
                                            height: "60px",
                                            borderRadius: "40%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <div className="twm-author-detail">
                                    <h3
                                        className="twm-title"
                                        style={{ margin: 0, fontSize: "18px" }}
                                    >
                                        {`${review.user.first_name} ${review.user.last_name}`}
                                    </h3>
                                    <div
                                        className="twm-position"
                                        style={{ fontSize: "14px", color: "#777" }}
                                    >
                                        {review.vehicle.name}, {review.vehicle.vehicle_model}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="twm-testimonial-detail"
                                style={{
                                    fontSize: "15px",
                                    color: "#333",
                                    marginBottom: "10px",
                                }}
                            >
                                <p>{review.feedback}</p>
                                <div
                                    className="twm-rating-wrap"
                                    style={{ color: "#FFD700" }}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>
                                            <i className="fa fa-star"></i>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < reviews.length && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={handleViewMore}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "25px",
                            cursor: "pointer",
                        }}
                    >
                        View More
                    </button>
                </div>
            )}
            {/*nxt*/}

            <div
                className="section-full p-t150 site-bg-white twm-w-steps-section-wrap wow fadeInDown"
                data-wow-offset="100"
                data-wow-delay="0.2"
                style={{backgroundImage: 'url("/images2/step-bg.jpg")'}}
            >
                <div className="container">
                    {/* TITLE START */}
                    <div className="section-head center">
                        <div className="twm-sm-title left">How it Work</div>
                        <h2 className="twm-large-title site-text-dark">Following Working Steps</h2>
                    </div>
                    {/* TITLE END */}

                    <div className="section-content">
  <div className="row twm-w-steps-section">
    <div className="col-lg-3 col-md-6 m-b30">
      <div className="twm-w-steps">
        <div className="twm-w-step-count">
          <span>01</span>
        </div>
        <div className="twm-w-step-detail">
          <h3 className="twm-title">Choose Your Ride</h3>
          <p>Browse through our wide selection of cars and bikes to find the perfect ride for your journey.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-3 col-md-6 m-b30">
      <div className="twm-w-steps">
        <div className="twm-w-step-count">
          <span>02</span>
        </div>
        <div className="twm-w-step-detail">
          <h3 className="twm-title">Select Pickup Details</h3>
          <p>Choose the date, time, and location for picking up your vehicle to match your schedule.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-3 col-md-6 m-b30">
      <div className="twm-w-steps">
        <div className="twm-w-step-count">
          <span>03</span>
        </div>
        <div className="twm-w-step-detail">
          <h3 className="twm-title">Confirm & Pay</h3>
          <p>Carefully review your booking details and make a secure payment to confirm your reservation.</p>
        </div>
      </div>
    </div>

    <div className="col-lg-3 col-md-6 m-b30">
      <div className="twm-w-steps">
        <div className="twm-w-step-count">
          <span>04</span>
        </div>
        <div className="twm-w-step-detail">
          <h3 className="twm-title">Hit the Road</h3>
          <p>Pick up your vehicle and enjoy a smooth, hassle-free ride wherever you want to go.</p>
        </div>
      </div>
    </div>
  </div>

  <div className="twm-adv-show">
    <img src="/images2/adv-car.png" alt="Image" />
  </div>
</div>

                </div>
            </div>

        </>
    )
}

export default Home;