import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { server_url } from "../utils/script.jsx";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${server_url}/contact-us`, data);
      const { error, message } = response.data;

      if (error) {
        console.log("Error:", message);
      } else {
        console.log("Success:", message);
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div
        className="wt-bnr-inr site-bg-dark twm-primary-overlay-wrap"
        style={{ backgroundImage: 'url(/images2/banner/banner-12.jpg)' }}
      >
        <div className="twm-primary-overlay"></div>
        <div className="container">
          <div className="wt-bnr-inr-entry">
            <div className="banner-title-outer">
              <div className="banner-title-name">
                <h2 className="wt-title">Contact Us</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="section-full p-t150 p-b120 site-bg-white twm-contact-section-wrap">
        <div className="container">
          <div className="section-content">
            <div className="twm-contact-section">
              <div className="row">

                {/* Left Info Panel */}
                <div className="col-xl-7 col-lg-6 col-md-12">
                  <div className="twm-maskingtext m-b50">
                    <h1>Get In Touch</h1>
                    <img src="/images2/text-masking-pic.jpg" alt="Image" />
                  </div>
                  <div className="twm-get-info-wrap">
                    <ul>
                      <li>
                        <div className="twm-get-info">
                          <div className="twm-media"><i className="feather feather-phone-call"></i></div>
                          <div className="twm-content">
                            <p>Phone</p>
                            <h3 className="twm-title"><a href="tel:+917696995479">+91 7696995479</a></h3>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="twm-get-info">
                          <div className="twm-media"><i className="feather feather-mail"></i></div>
                          <div className="twm-content">
                            <p>Email</p>
                            <h3 className="twm-title">rydify@gmail.com</h3>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="twm-get-info">
                          <div className="twm-media"><i className="feather feather-home"></i></div>
                          <div className="twm-content">
                            <p>Address</p>
                            <h3 className="twm-title">55/11 Ranjit Avenue, Amritsar</h3>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <div className="twm-social">
                      <h3 className="twm-title">Follow Us</h3>
                      <ul>
                        <li><a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a></li>
                        <li><a href="https://www.instagram.com/"><i className="feather feather-instagram"></i></a></li>
                        <li><a href="https://www.x.com/"><i className="fa-brands fa-x-twitter"></i></a></li>
                        <li><a href="https://www.pinterest.com/"><i className="fa-brands fa-pinterest-p"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Contact Form */}
                <div className="col-xl-5 col-lg-6 col-md-12">
                  <div className="twm-contact-page-detail">
                    <div className="section-head left">
                      <h2 className="twm-large-title">Contact Form</h2>
                      <p className="p-text">Enter your details. Feel free to contact us for any information.</p>
                    </div>

                    <div className="twm-contact-page-form">
                      <div className="contact-form-outer">
                        {!submitted ? (
                          <form className="cons-contact-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group mb-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    {...register("firstName", { required: true })}
                                  />
                                  {errors.firstName && <span className="text-danger">First name is required</span>}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6">
                                <div className="form-group mb-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    {...register("lastName", { required: true })}
                                  />
                                  {errors.lastName && <span className="text-danger">Last name is required</span>}
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="form-group mb-4">
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    {...register("email", { required: true })}
                                  />
                                  {errors.email && <span className="text-danger">Email is required</span>}
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="form-group mb-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone"
                                    {...register("phone", { required: true })}
                                  />
                                  {errors.phone && <span className="text-danger">Phone number is required</span>}
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="form-group mb-5">
                                  <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Message"
                                    {...register("message", { required: true })}
                                  ></textarea>
                                  {errors.message && <span className="text-danger">Message is required</span>}
                                </div>
                              </div>

                              <div className="col-md-12">
                                <button className="btn btn-dark" type="submit">
                                  <em>Submit Now</em>
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <div className="text-center p-4 border rounded bg-light">
                            <h4 className="mb-3">Thank You!</h4>
                            <p>Your message has been received. We'll get back to you soon.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="gmap-outline">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.960279868555!2d74.828156!3d31.634937899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39196527e76e3995%3A0xf5779932d3dab5d0!2sGuru%20Nanak%20Dev%20University!5e0!3m2!1sen!2sin!4v1747809278866!5m2!1sen!2sin"
          width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  );
}

export default Contact;
