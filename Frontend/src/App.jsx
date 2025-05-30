import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {createContext, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

{/* Public */}
import PublicLayout from "./layouts/PublicLayout.jsx";
import Home from "./pages/Home.jsx";
import UserLogin from "./pages/users/Login.jsx";
import UserSignup from "./pages/users/SignUp.jsx";
import DealerSignup from "./pages/dealer/SignUp.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import AdminLogin from "./pages/admin/Login.jsx"
import DealerLogin from "./pages/dealer/Login.jsx"

{/* Admin */}
import AdminLayout from "./layouts/AdminLayout.jsx";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";
import ChangePasswordAdmin from"./pages/admin/ChangePassword.jsx"
import ManageAdmin from "./pages/admin/Manage_admin.jsx"
import ManageDealer from "./pages/admin/Manage_Dealer.jsx"
import ManageCatgory from "./pages/admin/Manage_Category.jsx"
import ManageDriver from "./pages/admin/Manage_Driver.jsx"
import ViewBookings from "./pages/admin/ViewBookings.jsx"

{/* User */}

import UserLayout from "./layouts/UserLayout.jsx";
import Dashboard from "./pages/users/Dashboard.jsx";
import Profile from "./pages/users/Profile.jsx";
import ChangePassword from "./pages/users/ChangePassword.jsx";
import MyBooking from "./pages/users/MyBooking.jsx";
import Booking from "./pages/users/Booking.jsx";
import Thankyou from "./pages/users/Thankyou.jsx"

// Dealer
import DealerLayout from "./layouts/DealerLayout.jsx";
import DealerDashbaord from "./pages/dealer/Dashboard.jsx"
import ChangePasswordDealer from"./pages/dealer/ChangePassword.jsx"
import DealerProfile from "./pages/dealer/Profile.jsx";
import ManageVehicles from "./pages/dealer/Manage_Vehicle.jsx";
import ManagePendingReq from "./pages/dealer/Manage_Pending_Req.jsx";
import ManageApprovedReq from "./pages/dealer/Manage_Approved_Req.jsx";
import ManageCancelledReq from "./pages/dealer/Manage_Cancelled_Req.jsx";
import ManageCompletedReq from "./pages/dealer/Manage_Completed_Req.jsx";

export const NameContext = createContext();

function App() {
    const [name, setName] = useState("Pratham");

    const [user, setUser] = useState({
        name: 'Aryan',
        age: 24,
        gender: 'Male',
    });

    return (
        <BrowserRouter>
            <NameContext.Provider value={{name, setName, user, setUser}}>
                <Routes>
                    {/* Public */}
                    <Route path="/" element={<PublicLayout/>}>
                        <Route index element={<Home/>}/>

                        <Route path="about" element={<About/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="vehicles/:id" element={<Vehicles/>}/>
                        <Route path="user-signup" element={<UserSignup/>}/>
                        <Route path="dealer-signup" element={<DealerSignup/>}/>
                        <Route path="user-login" element={<UserLogin/>}/>
                        <Route path="admin-login" element={<AdminLogin/>}/>
                        <Route path="dealer-login" element={<DealerLogin/>}/>

                    </Route>

                    {/* Admin */}
                    <Route path="/admin" element={<AdminLayout/>}>
                        <Route path="dashboard" element={<DashboardAdmin/>}/>
                        <Route path="changepassword" element={<ChangePasswordAdmin/>}/>
                        <Route path="manage_admin" element={<ManageAdmin/>}/>
                        <Route path="manage_dealer" element={<ManageDealer/>}/>
                        <Route path="manage_category" element={<ManageCatgory/>}/>
                        <Route path="manage_driver" element={<ManageDriver/>}/>
                        <Route path="view_booking" element={<ViewBookings/>}/>

                    </Route>

                    {/* User */}
                    <Route path="/user" element={<UserLayout/>}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="changepassword" element={<ChangePassword/>}/>
                        <Route path="mybooking" element={<MyBooking/>}/>
                        <Route path="booking/:vehicleId" element={<Booking/>}/>
                        <Route path="thankyou" element={<Thankyou/>}/>

                    </Route>
                    {/* Dealer */}
                    <Route path="/dealer" element={<DealerLayout/>}>
                        <Route path="dashboard" element={<DealerDashbaord/>}/>
                        <Route path="changepassword" element={<ChangePasswordDealer/>}/>
                        <Route path="profile" element={<DealerProfile/>}/>
                        <Route path="manage_vehicle" element={<ManageVehicles/>}/>
                        <Route path="manage_booking_req" element={<ManagePendingReq/>}/>
                        <Route path="view_approved_req" element={<ManageApprovedReq/>}/>
                        <Route path="view_cancelled_req" element={<ManageCancelledReq/>}/>
                        <Route path="view_completed_req" element={<ManageCompletedReq/>}/>

                    </Route>
                </Routes>
            </NameContext.Provider>
        </BrowserRouter>
    )
}

export default App;